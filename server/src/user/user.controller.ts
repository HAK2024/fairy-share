import { Body, Controller, Get, Put, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMe(@GetUser('id') userId: number) {
    return this.userService.getMe(userId);
  }

  @Put()
  async updateUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const { user, token } = await this.userService.updateUser(userId, dto);
    // Set Cookie with user.token
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    res.send({ user: user });
  }
}
