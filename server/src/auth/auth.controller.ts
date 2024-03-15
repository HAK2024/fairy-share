import { Response } from 'express';
import * as crypto from 'crypto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthQueryDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
    @Query() query: AuthQueryDto,
  ) {
    const user = await this.authService.register(
      registerDto,
      query.invited_house_id,
    );

    // Set Cookie with user.token
    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    return res.send({ user: user.user, accessToken: user.token });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Query() query: AuthQueryDto,
  ) {
    const user = await this.authService.login(loginDto, query.invited_house_id);

    // Set Cookie with user.token
    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    return res.send({ user: user.user, accessToken: user.token });
  }

  @Post('login/google')
  async loginGoogle(
    @Body() body: { code: string },
    @Res() res: Response,
    @Query() query: AuthQueryDto,
  ) {
    const user = await this.authService.loginGoogle(
      body.code,
      query.invited_house_id,
    );
    // // Set Cookie with user.token
    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    return res.send({ user: user.user, accessToken: user.token });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() res: Response) {
    // Clear Cookie
    res.clearCookie('token');
    res.clearCookie('csrf-token');
    return res.send({ message: 'Logged out successfully' });
  }

  // For CSRF protection
  @Get('csrf-token')
  getCsrfToken(@Res() res: Response) {
    const csrfToken = crypto.randomBytes(64).toString('hex');
    res.cookie('csrf-token', csrfToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send({ csrfToken });
  }
}
