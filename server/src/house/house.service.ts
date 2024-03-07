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

  async getTodos(userId: number, houseId: number) {
    try {
      // Find the house of the user
      const house = await this.prisma.house.findUnique({
        where: {
          id: houseId,
          userHouses: {
            some: {
              userId: userId,
            },
          },
        },
        select: { name: true },
      });

      if (!house) {
        throw new NotFoundException(`House not found.`);
      }

      const currentDate = new Date();

      // Find the tasks for today
      const todayTasks = await this.prisma.task.findMany({
        where: {
          AND: [
            { assigneeId: userId },
            { houseId: houseId },
            {
              date: {
                gte: new Date(currentDate.setHours(0, 0, 0, 0)),
                lt: new Date(currentDate.setHours(23, 59, 59, 999)),
              },
            },
          ],
        },
      });

      const oneWeekLater = new Date(currentDate);
      oneWeekLater.setDate(currentDate.getDate() + 7); // Add 7 days to the current Date

      // Find the tasks for coming one week
      const weekTasks = await this.prisma.task.findMany({
        where: {
          AND: [
            { assigneeId: userId },
            { houseId: houseId },
            {
              date: {
                gte: new Date(currentDate.setDate(currentDate.getDate() + 1)), // Set the start date to the next day
                lt: oneWeekLater,
              },
            },
          ],
        },
      });

      // Find the expense that the user hasn't paid
      const userExpenses = await this.prisma.expense.findMany({
        where: {
          houseId: houseId,
          payments: {
            some: {
              payerId: userId,
              paidDate: null,
            },
          },
        },
        include: {
          payments: {
            where: {
              payerId: userId,
              paidDate: null,
            },
          },
        },
      });

      // If the user has at least one unpaid payment, return true
      const hasUnpaidPayments = userExpenses.some(
        (expense) => expense.payments.length > 0,
      );

      return {
        houseName: house.name,
        todayTasks,
        weekTasks,
        hasUnpaidPayments,
      };
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }
}
