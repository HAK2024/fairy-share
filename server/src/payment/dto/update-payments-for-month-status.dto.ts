import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePaymentsForMonthStatusDto {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  month: number;

  @IsNumber()
  @IsNotEmpty()
  buyerId: number;

  @IsNumber()
  @IsNotEmpty()
  payerId: number;

  @IsBoolean()
  @IsNotEmpty()
  isPaid: boolean;
}
