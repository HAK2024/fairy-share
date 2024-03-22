import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getMe(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          userHouses: {
            include: {
              house: {
                include: {
                  rules: true,
                  userHouses: {
                    include: {
                      user: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      const responseUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        icon: user.icon,
        houses: user.userHouses.map((userHouse) => {
          return {
            houseId: userHouse.house.id,
            name: userHouse.house.name,
            isExpensePerTime: userHouse.house.isExpensePerTime,
            isAdmin: userHouse.isAdmin,
            rules: userHouse.house.rules,
            houseMembers: userHouse.house.userHouses.map(({ user }) => ({
              id: user.id,
              name: user.name,
            })),
          };
        }),
      };

      return responseUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: dto,
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

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
