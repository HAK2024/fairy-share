import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { compare, hash } from 'bcrypt';

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
                          icon: true,
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
            currentUserIsAdmin: userHouse.isAdmin,
            rules: userHouse.house.rules,
            tasks: userHouse.house.tasks,
            houseMembers: userHouse.house.userHouses.map(
              ({ isAdmin, user }) => ({
                id: user.id,
                name: user.name,
                isAdmin,
                icon: user.icon,
              }),
            ),
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
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      if (dto.email !== user.email) {
        const existingEmail = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

        if (existingEmail) {
          throw new ForbiddenException('Email address already in use.');
        }
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: dto,
      });

      delete updatedUser.hashedPassword;

      const token = await this.auth.generateJwtToken(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.icon,
      );

      return {
        token,
        user: updatedUser,
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

  async changePassword(userId: number, dto: ChangePasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      const passwordMatch = await compare(
        dto.currentPassword,
        user.hashedPassword,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (dto.newPassword !== dto.confirmNewPassword) {
        throw new BadRequestException(
          'New password and confirmation password do not match',
        );
      }

      const hashedPassword = await hash(dto.newPassword, 10);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword,
        },
      });

      delete updatedUser.hashedPassword;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  async deleteUser(userId: number) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        await this.deleteUserFromDatabase(userId);
        return { message: 'User deleted successfully.' };
      }

      if (userHouse.isAdmin) {
        const otherAdminsCount = await this.prisma.userHouse.count({
          where: {
            houseId: userHouse.houseId,
            isAdmin: true,
            userId: { not: userId },
          },
        });
        if (otherAdminsCount === 0) {
          throw new ForbiddenException(
            'Cannot delete account. You are the only admin in this house.',
          );
        }
      }

      await this.deleteUserFromDatabase(userId);

      return { message: 'User deleted successfully.' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  private async deleteUserFromDatabase(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
