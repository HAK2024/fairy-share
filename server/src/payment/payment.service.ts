import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdatePaymentsStatusPerDateDto,
  UpdatePaymentsStatusPerMonthDto,
} from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async updatePaymentsStatusPerDate(
    userId: number,
    paymentId: number,
    dto: UpdatePaymentsStatusPerDateDto,
  ) {
    try {
      const { isPaid } = dto;
      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId },
      });

      if (!userHouse) {
        throw new ForbiddenException('You do not belong to any house.');
      }

      const payment = await this.prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          expense: true,
        },
      });

      if (!payment) {
        throw new NotFoundException(`payment with ID ${paymentId} not found.`);
      }

      if (payment.payerId !== userId) {
        throw new ForbiddenException(
          'You do not have permission to update this payment.',
        );
      }

      const updatedPayment = await this.prisma.payment.update({
        where: { id: paymentId },
        data: {
          paidDate: isPaid ? new Date() : null,
        },
      });

      return updatedPayment;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  async updatePaymentsStatusPerMonth(
    userId: number,
    dto: UpdatePaymentsStatusPerMonthDto,
  ) {
    try {
      const { year, month, buyerId, payerId, isPaid, houseId } = dto;

      const userHouse = await this.prisma.userHouse.findFirst({
        where: { userId, houseId },
      });

      if (!userHouse) {
        throw new ForbiddenException(
          'You are not a member of the specified house.',
        );
      }

      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);

      const payments = await this.prisma.payment.findMany({
        where: {
          payerId,
          expense: {
            buyerId,
            date: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
          paidDate: isPaid ? null : { not: null },
        },
      });

      const updatePromises = payments.map((payment) =>
        this.prisma.payment.update({
          where: { id: payment.id },
          data: { paidDate: isPaid ? new Date() : null },
        }),
      );

      const updatedPayments = await Promise.all(updatePromises);
      return updatedPayments;
    } catch (error) {
      console.error('Error updating payments per month status:', error);
      throw error;
    }
  }
}
