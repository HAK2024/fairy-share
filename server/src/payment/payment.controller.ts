import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard';
import { PaymentService } from './payment.service';
import {
  UpdatePaymentsStatusPerDateDto,
  UpdatePaymentsStatusPerMonthDto,
} from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Put(':paymentId/status')
  updatePaymentStatus(
    @GetUser('id') userId: number,
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() updatePaymentsStatusPerDateDto: UpdatePaymentsStatusPerDateDto,
  ) {
    return this.paymentService.updatePaymentsStatusPerDate(
      userId,
      paymentId,
      updatePaymentsStatusPerDateDto,
    );
  }

  @Put('/status/per-month')
  updatePaymentsForMonthStatus(
    @GetUser('id') userId: number,
    @Body() updatePaymentsStatusPerMonthDto: UpdatePaymentsStatusPerMonthDto,
  ) {
    return this.paymentService.updatePaymentsStatusPerMonth(
      userId,
      updatePaymentsStatusPerMonthDto,
    );
  }
}
