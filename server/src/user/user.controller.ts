import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('test')
  getAll() {
    return 'all users';
  }

  @UseGuards(JwtGuard)
  @Get()
  getMe(@GetUser('id') userId: number) {
    console.log('userId', userId);
    return this.userService.getMe(userId);
  }
}
