import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.userHouse.deleteMany(),
      this.house.deleteMany(),
      this.rule.deleteMany(),
      this.task.deleteMany(),
      this.expense.deleteMany(),
      this.payment.deleteMany(),
      this.expensePayment.deleteMany(),
    ]);
  }
}
