import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  text: string;
}
