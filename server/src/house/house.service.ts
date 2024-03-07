import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async getHouse(houseId: number) {
    try {
      const house = await this.prisma.house.findUnique({
        where: { id: houseId },
        include: {
          rules: true,
          userHouses: true,
          tasks: true,
          expenses: true,
        },
      });

      if (!house) {
        throw new NotFoundException(`House with ID ${houseId} not found.`);
      }
      return house;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }
}
