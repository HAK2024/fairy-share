import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  month: number;

  @IsNumber()
  @IsNotEmpty()
  houseId: number;
}
