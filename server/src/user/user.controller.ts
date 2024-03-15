import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UpdateUserDto } from './dto/update-user-dto';

@UseGuards(AuthGuard)
@Controller('me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMe(@GetUser('id') userId: number) {
    return this.userService.getMe(userId);
  }

  @Put(':userId')
  updateUser(@GetUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
