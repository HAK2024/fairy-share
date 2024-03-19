import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { Prisma } from '@prisma/client';
import { oAuth2Client } from '../libs/google-auth';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto, invitedHouseId?: string) {
    // Bcrypt password
    const hashedPassword = await hash(dto.password, 10);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            hashedPassword: hashedPassword,
            icon: 'WHITE',
          },
        });

        // If user is invited to a house, add user to house
        if (invitedHouseId) {
          const house = await tx.house.findUnique({
            where: { id: Number(invitedHouseId) },
          });

          if (!house) {
            throw new NotFoundException(
              `House with ID ${invitedHouseId} not found.`,
            );
          }

          await tx.userHouse.create({
            data: {
              userId: user.id,
              houseId: Number(invitedHouseId),
              isAdmin: false,
            },
          });
        }

        delete user.hashedPassword;

        const token = await this.generateJwtToken(
          user.id,
          user.name,
          user.email,
          user.icon,
        );

        return {
          token,
          user,
        };
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // "Unique constraint failed on the {constraint}"
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials token');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto, invitedHouseId?: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: {
          userHouses: {
            include: {
              house: {
                include: {
                  rules: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await compare(dto.password, user.hashedPassword);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // If user does not have any house yet and is invited to a house, add user to house
      if (invitedHouseId && user.userHouses.length === 0) {
        const house = await this.prisma.house.findUnique({
          where: { id: Number(invitedHouseId) },
        });

        if (!house) {
          throw new NotFoundException(
            `House with ID ${invitedHouseId} not found.`,
          );
        }

        await this.prisma.userHouse.create({
          data: {
            userId: user.id,
            houseId: Number(invitedHouseId),
            isAdmin: false,
          },
        });
      }

      delete user.hashedPassword;
      delete user.userHouses;

      const token = await this.generateJwtToken(
        user.id,
        user.name,
        user.email,
        user.icon,
      );

      return {
        token,
        user,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginGoogle(code: string, invitedHouseId?: string) {
    try {
      // exchange code for tokens
      const { tokens } = await oAuth2Client.getToken(code);

      const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();

      const existedUser = await this.prisma.user.findUnique({
        where: { email },
        include: {
          userHouses: {
            include: {
              house: {
                include: {
                  rules: true,
                },
              },
            },
          },
        },
      });

      // If user exists, generate token and return
      if (existedUser) {
        // If user does not have any house yet and is invited to a house, add user to house
        if (invitedHouseId && existedUser.userHouses.length === 0) {
          const house = await this.prisma.house.findUnique({
            where: { id: Number(invitedHouseId) },
          });

          if (!house) {
            throw new NotFoundException(
              `House with ID ${invitedHouseId} not found.`,
            );
          }

          await this.prisma.userHouse.create({
            data: {
              userId: existedUser.id,
              houseId: Number(invitedHouseId),
              isAdmin: false,
            },
          });
        }

        delete existedUser.hashedPassword;
        delete existedUser.userHouses;

        const token = await this.generateJwtToken(
          existedUser.id,
          existedUser.name,
          existedUser.email,
          existedUser.icon,
        );

        return {
          token,
          user: existedUser,
        };

        // If user does not exist, create user and generate token
      } else {
        return await this.prisma.$transaction(async (tx) => {
          const newUser = await tx.user.create({
            data: {
              name: name,
              email: email,
              hashedPassword: '',
              icon: 'WHITE',
            },
          });

          // If user is invited to a house, add user to house
          if (invitedHouseId) {
            const house = await tx.house.findUnique({
              where: { id: Number(invitedHouseId) },
            });

            if (!house) {
              throw new NotFoundException(
                `House with ID ${invitedHouseId} not found.`,
              );
            }

            await tx.userHouse.create({
              data: {
                userId: newUser.id,
                houseId: Number(invitedHouseId),
                isAdmin: false,
              },
            });
          }

          delete newUser.hashedPassword;

          const token = await this.generateJwtToken(
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.icon,
          );

          return {
            token,
            user: newUser,
          };
        });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // "Unique constraint failed on the {constraint}"
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials token');
        }
      }
      throw error;
    }
  }

  async generateJwtToken(
    id: number,
    name: string,
    email: string,
    icon: string,
  ) {
    const payload = { id, name, email, icon };

    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRES_IN');

    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn,
    });

    return token;
  }
}
