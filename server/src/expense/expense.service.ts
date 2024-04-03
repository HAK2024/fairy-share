import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async createExpense(userId: number, dto: CreateExpenseDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Check if the user belongs to the specified house
        const userHouse = await tx.userHouse.findFirst({
          where: {
            userId: userId,
            houseId: dto.houseId,
          },
        });

        // If the user does not belong to the house, throw an error
        if (!userHouse) {
          throw new ForbiddenException(
            'User does not belong to the specified house.',
          );
        }

        const createdExpense = await tx.expense.create({
          data: {
            itemName: dto.itemName,
            fee: dto.fee,
            date: dto.date,
            houseId: dto.houseId,
            buyerId: userId,
          },
        });

        const houseMembersList = await tx.userHouse.findMany({
          where: {
            houseId: dto.houseId,
          },
        });

        // Calculate the individual payment amount (rounded to one decimal place)
        const individualPaymentAmount =
          Math.floor((dto.fee / houseMembersList.length) * 10) / 10;

        // Payment data for each house member (excluding the buyer)
        const paymentsData = houseMembersList
          .filter((houseMember) => houseMember.userId !== userId)
          .map((houseMember) => ({
            fee: individualPaymentAmount,
            expenseId: createdExpense.id,
            payerId: houseMember.userId,
          }));

        await tx.payment.createMany({
          data: paymentsData,
        });

        // Get all payments linked to the created expense
        const createdPaymentsResult = await tx.payment.findMany({
          where: {
            expenseId: createdExpense.id,
          },
        });

        return {
          expense: { ...createdExpense, payments: createdPaymentsResult },
        };
      });
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  async updateExpense(
    userId: number,
    expenseId: number,
    dto: UpdateExpenseDto,
  ) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const expense = await tx.expense.findUnique({
          where: { id: expenseId },
        });

        if (!expense) {
          throw new NotFoundException(
            `Expense with ID ${expenseId} not found.`,
          );
        }

        if (expense.buyerId !== userId) {
          throw new ForbiddenException(
            'You do not have permission to update this expense.',
          );
        }

        const updatedExpense = await tx.expense.update({
          where: { id: expenseId },
          data: {
            itemName: dto.itemName,
            fee: dto.fee,
            date: dto.date,
          },
        });

        // Count the number of existing payments related to this expense.
        const existingPaymentsCount = await tx.payment.count({
          where: {
            expenseId: expenseId,
          },
        });

        // Calculate the amount each member has to pay, dividing the total fee by the number of members involved (including the buyer).
        const individualPaymentAmount =
          Math.floor((dto.fee / (existingPaymentsCount + 1)) * 10) / 10;

        // Update the fee for all payments associated with this expense
        await tx.payment.updateMany({
          where: {
            expenseId: updatedExpense.id,
          },
          data: {
            fee: individualPaymentAmount,
          },
        });

        const updatedPayments = await tx.payment.findMany({
          where: {
            expenseId: updatedExpense.id,
          },
        });

        return {
          expense: { ...updatedExpense, payments: updatedPayments },
        };
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  async deleteExpense(userId: number, expenseId: number) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id: expenseId },
      });

      if (!expense) {
        throw new NotFoundException(`Expense with ID ${expenseId} not found.`);
      }

      if (expense.buyerId !== userId) {
        throw new UnauthorizedException(
          'You do not have permission to delete this expense.',
        );
      }

      await this.prisma.expense.delete({
        where: {
          id: expenseId,
        },
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }
}
