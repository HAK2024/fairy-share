import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePaymentsStatusPerDateDto {
  @IsDateString()
  date: string;

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
