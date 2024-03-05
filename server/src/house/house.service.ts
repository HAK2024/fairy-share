import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async getHouses(houseId: number) {
    const house = await this.prisma.house.findUnique({
      where: { id: houseId },
      include: {
        Rule: true,
        UserHouse: true,
        Task: true,
        Expense: true,
      },
    });

    if (!house) {
      throw new NotFoundException(`House with ID ${houseId} not found.`);
    }
    return house.Rule;
  }
}
