import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateRuleDto } from './sub-dto';
import { Type } from 'class-transformer';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isExpensePerTime: boolean;

  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => CreateRuleDto)
  rules: CreateRuleDto[];
}
