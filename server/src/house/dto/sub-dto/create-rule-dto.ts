import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  text: string;
}
