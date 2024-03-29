import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard';
import { ExpenseService } from './expense.service';
import { GetUser } from '../auth/decorator';
import { CreateExpenseDto } from './dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  createExpense(@GetUser('id') userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }
}
