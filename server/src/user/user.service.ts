import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
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
                  tasks: true,
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
            tasks: userHouse.house.tasks,
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

      delete user.hashedPassword;

      const token = await this.auth.generateJwtToken(
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

  async deleteUser(userId: number, houseId: number) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId, houseId },
      });
      // const userHouse = await this.prisma.userHouse.findUnique({
      //   where: { userId_houseId: { userId, houseId } },
      // });

      if (!userHouse) {
        throw new NotFoundException(
          `User house not found for user ID ${userId} and house ID ${houseId}`,
        );
      }

      console.log('use House>>', userHouse);

      if (userHouse.isAdmin) {
        const otherAdminsCount = await this.prisma.userHouse.count({
          where: { houseId, isAdmin: true, userId: { not: userId } },
        });
        if (otherAdminsCount === 0) {
          throw new ForbiddenException(
            'Cannot delete account. You are the only admin in this house.',
          );
        }
      }

      await this.prisma.userHouse.delete({
        where: { id: userHouse.id },
      });
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return { message: 'Account deleted successfully.' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
