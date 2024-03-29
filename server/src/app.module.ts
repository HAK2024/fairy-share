import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HouseModule } from './house/house.module';
import { TaskModule } from './task/task.module';
import { UserHouseModule } from './user-house/user-house.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    HouseModule,
    PrismaModule,
    TaskModule,
    UserHouseModule,
    ExpenseModule,
  ],
})
export class AppModule {}
