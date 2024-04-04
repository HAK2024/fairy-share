import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  itemName: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  houseId: number;
}
