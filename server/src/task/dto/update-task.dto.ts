import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsOptional()
  @MaxLength(200)
  note?: string;

  @IsNumber()
  @IsNotEmpty()
  assigneeId: number;
}
