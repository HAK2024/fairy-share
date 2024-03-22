import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserHouseService } from './user-house.service';
import { GetUser } from '../auth/decorator';
import { AuthGuard } from '../auth/guard';
import { CreateUserHouseDto } from './dto';

@UseGuards(AuthGuard)
@Controller('user-houses')
export class UserHouseController {
  constructor(private userHouseService: UserHouseService) {}

  @Post('')
  addUserToHouse(
    @GetUser('id') userId: number,
    @Body() createHouseDto: CreateUserHouseDto,
  ) {
    console.log('userId:', userId);
    return this.userHouseService.addUserToHouse(userId, createHouseDto);
  }
}
