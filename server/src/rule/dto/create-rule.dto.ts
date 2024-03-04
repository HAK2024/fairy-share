import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
