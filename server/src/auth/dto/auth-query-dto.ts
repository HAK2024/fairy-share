import { IsNumberString, IsOptional } from 'class-validator';

export class AuthQueryDto {
  @IsNumberString()
  @IsOptional()
  invited_house_id?: string;
}
