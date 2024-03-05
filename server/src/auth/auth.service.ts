import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Bcrypt password
    const hashedPassword = await hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hashedPassword: hashedPassword,
          icon: 'WHITE',
        },
      });

      delete user.hashedPassword;

      const token = await this.generateJwtToken(
        user.id,
        user.name,
        user.email,
        user.icon,
      );

      return {
        token,
        user,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // "Unique constraint failed on the {constraint}"
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials token');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await compare(dto.password, user.hashedPassword);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      delete user.hashedPassword;

      const token = await this.generateJwtToken(
        user.id,
        user.name,
        user.email,
        user.icon,
      );

      return {
        token,
        user,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async generateJwtToken(
    id: number,
    name: string,
    email: string,
    icon: string,
  ) {
    const payload = { id, name, email, icon };

    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRES_IN');

    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn,
    });

    return token;
  }
}
