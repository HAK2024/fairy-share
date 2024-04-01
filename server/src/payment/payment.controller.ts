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
import { UpdatePaymentStatusDto, UpdatePaymentsForMonthStatusDto } from './dto';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Put(':paymentId/status')
  updatePaymentStatus(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentService.updatePaymentStatus(
      paymentId,
      updatePaymentStatusDto,
    );
  }

  @Put('/status')
  updatePaymentsForMonthStatus(@Body() dto: UpdatePaymentsForMonthStatusDto) {
    return this.paymentService.updatePaymentsForMonthStatus(dto);
  }
}
