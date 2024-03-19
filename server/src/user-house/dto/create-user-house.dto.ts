import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserHouseDto {
  @IsNotEmpty()
  @IsNumberString()
  houseId: string;
}
