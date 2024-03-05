import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthGuard } from '../../auth/guard';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [AuthGuard],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    app.use(cookieParser());
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    // Create a user
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'password',
        icon: 'WHITE',
      });

    // Extract the JWT token from the response
    const jwtCookies = response.headers['set-cookie'];

    if (jwtCookies && jwtCookies.length) {
      const jwtCookie = jwtCookies[0];
      token = jwtCookie.split('=')[1].split(';')[0];
    }

    const csrfResponse = await request(app.getHttpServer()).get(
      '/auth/csrf-token',
    );

    csrfToken = csrfResponse.body.csrfToken;
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /me', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get('/me').expect(401);
    });

    it('should return 200 and user data if authenticated', async () => {
      await request(app.getHttpServer())
        .get('/me')
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .set('Authorization', 'abc123')
        .expect(200);
    });
  });
});
