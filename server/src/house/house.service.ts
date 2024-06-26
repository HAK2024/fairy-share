import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHouseDto, UpdateHouseDto } from './dto';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async createHouse(userId: number, dto: CreateHouseDto) {
    try {
      const house = await this.prisma.house.create({
        data: {
          name: dto.name,
          isExpensePerTime: dto.isExpensePerTime,
          userHouses: {
            create: {
              userId,
              isAdmin: true,
            },
          },
          rules: {
            create: dto.rules,
          },
        },
        include: {
          userHouses: true,
          rules: true,
          tasks: true,
        },
      });

      const responseHouse = {
        houseId: house.id,
        name: house.name,
        isExpensePerTime: house.isExpensePerTime,
        rules: house.rules,
        tasks: house.tasks,
        isAdmin: house.userHouses[0].isAdmin,
      };

      return responseHouse;
    } catch (error) {
      console.error('Error creating house:', error);
      throw error;
    }
  }

  async getHouse(userId: number, houseId: number) {
    try {
      const house = await this.prisma.house.findUnique({
        where: { id: houseId, userHouses: { some: { userId } } },
        include: {
          rules: true,
          userHouses: {
            select: {
              isAdmin: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  icon: true,
                },
              },
            },
          },
          tasks: true,
        },
      });

      if (!house) {
        throw new NotFoundException(`House with ID ${houseId} not found.`);
      }

      const houseMembers = house.userHouses.map(({ isAdmin, user }) => ({
        id: user.id,
        name: user.name,
        isAdmin,
        icon: user.icon,
      }));

      const isAdmin = house.userHouses.some(
        (userHouse) => userHouse.user.id === userId && userHouse.isAdmin,
      );

      const houseResponse = {
        houseId: house.id,
        name: house.name,
        isExpensePerTime: house.isExpensePerTime,
        rules: house.rules,
        tasks: house.tasks,
        currentUserIsAdmin: isAdmin,
        houseMembers,
      };
      return houseResponse;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async updateHouse(userId: number, houseId: number, dto: UpdateHouseDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const house = await tx.house.findUnique({
          where: {
            id: houseId,
            userHouses: {
              some: {
                userId,
                isAdmin: true,
              },
            },
          },
          include: {
            rules: true,
          },
        });

        if (!house) {
          throw new ForbiddenException(
            `You are not authorized to update this house.`,
          );
        }

        const rulesInHouse = house.rules.map((rule) => rule.id);

        const ruleIds = dto.rules
          .map((rule) => rule.id)
          .filter((id) => id !== null);

        // Return Error if the rule Id does not contain in the house
        for (const id of ruleIds) {
          if (!rulesInHouse.includes(id)) {
            throw new NotFoundException(
              `Rule with ID ${id} not found in the house.`,
            );
          }
        }

        // Delete all the rules that does not exist in the dto
        await tx.rule.deleteMany({
          where: {
            houseId: houseId,
            id: {
              notIn: ruleIds,
            },
          },
        });

        const createRules = dto.rules.filter((rule) => !rule.id);
        const updateRules = dto.rules.filter((rule) => rule.id);

        const updatedHouse = await tx.house.update({
          where: { id: houseId },
          data: {
            name: dto.name,
            isExpensePerTime: dto.isExpensePerTime,
            rules: {
              updateMany: updateRules.map((rule) => ({
                where: { id: rule.id },
                data: { text: rule.text },
              })),
              create: createRules.map((rule) => ({
                text: rule.text,
              })),
            },
          },
          include: {
            userHouses: true,
            rules: true,
            tasks: true,
          },
        });

        const responseHouse = {
          houseId: updatedHouse.id,
          name: updatedHouse.name,
          isExpensePerTime: updatedHouse.isExpensePerTime,
          rules: updatedHouse.rules,
          tasks: updatedHouse.tasks,
          isAdmin: updatedHouse.userHouses[0].isAdmin,
        };

        return responseHouse;
      });
    } catch (error) {
      console.error('Error updating house:', error);
      throw error;
    }
  }

  async deleteHouse(userId: number, houseId: number) {
    try {
      const house = await this.prisma.house.findUnique({
        where: {
          id: houseId,
          userHouses: {
            some: {
              userId,
              isAdmin: true,
            },
          },
        },
      });

      if (!house) {
        throw new ForbiddenException(
          'You are not authorized to delete this house.',
        );
      }

      await this.prisma.house.delete({
        where: { id: houseId },
      });

      return { message: 'House deleted successfully.' };
    } catch (error) {
      console.error('Error deleting house:', error);
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

      // Find the expense that the user hasn't paid for the past 3 months
      const today = new Date();
      const firstDayOfCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
      const startOfThreeMonthsAgo = new Date(firstDayOfCurrentMonth);
      startOfThreeMonthsAgo.setMonth(firstDayOfCurrentMonth.getMonth() - 2);

      const userExpenses = await this.prisma.expense.findMany({
        where: {
          houseId: houseId,
          date: {
            gte: startOfThreeMonthsAgo,
            lte: today,
          },
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
