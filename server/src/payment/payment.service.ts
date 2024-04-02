import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdatePaymentsStatusPerDateDto,
  UpdatePaymentsStatusPerMonthDto,
} from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async updatePaymentsStatusPerDate(dto: UpdatePaymentsStatusPerDateDto) {
    try {
      const { date, buyerId, payerId, isPaid } = dto;
      const targetDateStart = new Date(date);
      targetDateStart.setUTCHours(0, 0, 0, 0);

      const targetDateEnd = new Date(date);
      targetDateEnd.setUTCHours(23, 59, 59, 999);

      const payments = await this.prisma.payment.findMany({
        where: {
          payerId,
          expense: {
            buyerId,
            date: {
              gte: targetDateStart,
              lte: targetDateEnd,
            },
          },
          paidDate: isPaid ? null : { not: null },
        },
      });

      console.log(payments);

      const updatePromises = payments.map((payment) =>
        this.prisma.payment.update({
          where: { id: payment.id },
          data: { paidDate: isPaid ? new Date() : null },
        }),
      );

      const updatedPayments = await Promise.all(updatePromises);
      return updatedPayments;
    } catch (error) {
      console.error('Error updating payments per date status:', error);
      throw error;
    }
  }

  async updatePaymentsStatusPerMonth(dto: UpdatePaymentsStatusPerMonthDto) {
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
      console.error('Error updating payments per month status:', error);
      throw error;
    }
  }
}
