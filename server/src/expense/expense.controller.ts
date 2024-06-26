import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard';
import { ExpenseService } from './expense.service';
import { GetUser } from '../auth/decorator';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('/per-date')
  getExpensePerDate(@GetUser('id') userId: number) {
    return this.expenseService.getExpensePerDate(userId);
  }

  @Get('/per-month')
  getExpensePerMonth(@GetUser('id') userId: number) {
    return this.expenseService.getExpensePerMonth(userId);
  }

  @Get(':expenseId')
  getExpense(
    @GetUser('id') userId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.getExpense(userId, expenseId);
  }

  @Post()
  createExpense(@GetUser('id') userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }

  @Put(':expenseId')
  updateExpense(
    @GetUser('id') userId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(
      userId,
      expenseId,
      updateExpenseDto,
    );
  }

  @Delete(':expenseId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteExpense(
    @GetUser('id') userId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.deleteExpense(userId, expenseId);
  }
}
