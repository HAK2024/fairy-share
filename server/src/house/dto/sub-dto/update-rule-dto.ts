import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateRuleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id: number | null;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  text: string;
}
