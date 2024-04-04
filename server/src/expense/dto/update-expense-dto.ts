import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class UpdateExpenseDto {
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
}
