import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';

export const buildDefaultModules = () => {
  return [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true })];
};
