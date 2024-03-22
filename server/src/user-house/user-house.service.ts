import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserHouseDto } from './dto';

@Injectable()
export class UserHouseService {
  constructor(private prisma: PrismaService) {}

  async addUserToHouse(userId: number, dto: CreateUserHouseDto) {
    try {
      const userHouse = await this.prisma.userHouse.findFirst({
        where: {
          userId,
        },
      });

      if (userHouse) {
        throw new ConflictException('User already has a house.');
      }

      const houseId = Number(dto.houseId);
      const createdUserHouse = await this.prisma.userHouse.create({
        data: {
          userId,
          houseId,
          isAdmin: false,
        },
      });

      return { createdUserHouse };
    } catch (error) {
      console.error('Error adding user to house:', error);
      throw error;
    }
  }
}
