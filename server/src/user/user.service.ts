import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          userHouses: true,
          tasks: true,
          expenses: true,
          payments: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
