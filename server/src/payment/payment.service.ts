import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePaymentStatusDto, UpdatePaymentsForMonthStatusDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async updatePaymentStatus(paymentId: number, dto: UpdatePaymentStatusDto) {
    try {
      const payment = await this.prisma.payment.update({
        where: {
          id: paymentId,
        },
        data: {
          paidDate: dto.isPaid ? new Date() : null,
        },
      });

      return { paidDate: payment.paidDate };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Payment with ID ${paymentId} not found.`);
      }
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  async updatePaymentsForMonthStatus(dto: UpdatePaymentsForMonthStatusDto) {
    try {
      const { year, month, buyerId, payerId, isPaid } = dto;
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
      console.error('Error updating payments for month status:', error);
      throw error;
    }
  }
}
