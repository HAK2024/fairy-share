import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard';
import { PaymentService } from './payment.service';
import {
  UpdatePaymentsStatusPerDateDto,
  UpdatePaymentsStatusPerMonthDto,
} from './dto';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Put('/status/per-date')
  updatePaymentStatus(
    @Body() updatePaymentsStatusPerDateDto: UpdatePaymentsStatusPerDateDto,
  ) {
    return this.paymentService.updatePaymentsStatusPerDate(
      updatePaymentsStatusPerDateDto,
    );
  }

  @Put('/status/per-month')
  updatePaymentsForMonthStatus(@Body() dto: UpdatePaymentsStatusPerMonthDto) {
    return this.paymentService.updatePaymentsStatusPerMonth(dto);
  }
}
