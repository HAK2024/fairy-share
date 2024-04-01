import { IsDateString, ValidateIf } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ValidateIf((val) => val.paidDate !== null)
  @IsDateString()
  paidDate: Date | null;
}
