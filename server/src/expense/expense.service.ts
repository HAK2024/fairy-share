import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async createExpense(userId: number, dto: CreateExpenseDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
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
}