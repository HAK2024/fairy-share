import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
      // Check if password is being updated
      if (dto.password) {
        dto.password = await hash(dto.password, 10);
      }

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: dto,
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
