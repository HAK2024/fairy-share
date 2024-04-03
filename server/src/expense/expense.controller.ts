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
import { CreateExpenseDto, GetExpenseDto, UpdateExpenseDto } from './dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('/per-date')
  getExpensePerDate(@GetUser('id') userId: number, @Body() dto: GetExpenseDto) {
    return this.expenseService.getExpensePerDate(userId, dto);
  }

  @Get('/per-month')
  getExpensePerMonth(
    @GetUser('id') userId: number,
    @Body() dto: GetExpenseDto,
  ) {
    return this.expenseService.getExpensePerMonth(userId, dto);
  }

  @Post()
  createExpense(@GetUser('id') userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }

  @Put(':expenseId')
  updateExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(expenseId, updateExpenseDto);
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
