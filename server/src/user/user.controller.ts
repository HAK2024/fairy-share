import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('me')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getMe(@GetUser('id') userId: number) {
    return this.userService.getMe(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':houseId/todos')
  getHomeInfo(
    @GetUser('id') userId: number,
    @Param('houseId', ParseIntPipe) houseId: number,
  ) {
    return this.userService.getTodos(userId, houseId);
  }
}
