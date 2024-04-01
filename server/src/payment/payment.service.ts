import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePaymentStatusDto } from './dto';

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
          paidDate: dto.paidDate,
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
}
