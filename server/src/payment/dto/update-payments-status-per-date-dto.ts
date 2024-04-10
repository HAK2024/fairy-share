import { IsBoolean } from 'class-validator';

export class UpdatePaymentsStatusPerDateDto {
  @IsBoolean()
  isPaid: boolean;
}
