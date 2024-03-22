import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { UserHouseService } from './user-house.service';
import { GetUser } from '../auth/decorator';
import { AuthGuard } from '../auth/guard';
import { CreateUserHouseDto, UpdateAdminDto } from './dto';

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

  @Put('/admin')
  updateAdmin(
    @GetUser('id') userId: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.userHouseService.updateAdminStatus(userId, updateAdminDto);
  }
}
