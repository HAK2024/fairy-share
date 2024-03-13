import {
  ForbiddenException,
  Injectable,
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

  async register(dto: RegisterDto) {
    // Bcrypt password
    const hashedPassword = await hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hashedPassword: hashedPassword,
          icon: 'WHITE',
        },
      });

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

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await compare(dto.password, user.hashedPassword);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginGoogle(code: string) {
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
      });

      // If user exists, generate token and return
      if (existedUser) {
        delete existedUser.hashedPassword;

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
        const newUser = await this.prisma.user.create({
          data: {
            name: name,
            email: email,
            hashedPassword: '',
            icon: 'WHITE',
          },
        });

        delete newUser.hashedPassword;

        const token = await this.generateJwtToken(
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.icon,
        );

        return {
          token,
          newUser,
        };
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
