import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async getHouse(userId: number, houseId: number) {
    try {
      const house = await this.prisma.house.findUnique({
        where: { id: houseId, userHouses: { some: { userId } } },
        include: {
          rules: true,
          userHouses: {
            where: { userId },
            select: { isAdmin: true },
          },
        },
      });

      if (!house) {
        throw new NotFoundException(`House with ID ${houseId} not found.`);
      }

      const houseResponse = {
        houseId: house.id,
        name: house.name,
        isExpensePerTime: house.isExpensePerTime,
        rules: house.rules,
        isAdmin: house.userHouses[0]?.isAdmin,
      };
      return houseResponse;
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
        orderBy: [{ date: 'asc' }, { id: 'asc' }],
      });

      // Set the start date to the next day
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0, 0); // Set the start of the day for the next day

      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(oneWeekLater.getDate() + 6); // Add 6 more days to cover a total of 7 days, including the next day

      // Find the tasks for coming one week
      const weekTasks = await this.prisma.task.findMany({
        where: {
          AND: [
            { assigneeId: userId },
            { houseId: houseId },
            {
              date: {
                gte: startDate,
                lt: oneWeekLater,
              },
            },
          ],
        },
        orderBy: [{ date: 'asc' }, { id: 'asc' }],
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
