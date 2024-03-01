import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('me')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getMe(@GetUser('id') userId: number) {
    console.log('userId', userId);
    return this.userService.getMe(userId);
  }
}
