import { IsBoolean } from 'class-validator';

export class UpdatePaymentStatusDto {
  @IsBoolean()
  isPaid: boolean;
}
