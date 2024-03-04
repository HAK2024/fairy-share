import { IsOptional, IsString } from 'class-validator';

export class UpdateRuleDto {
  @IsString()
  @IsOptional()
  text?: string;
}
