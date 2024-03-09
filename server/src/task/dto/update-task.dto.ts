import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  note: string;

  @IsNumber()
  @IsNotEmpty()
  assigneeId: number;
}
