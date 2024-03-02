import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(async () => {
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  const user = {
    name: 'Test1',
    email: 'Test1@test.com',
    password: 'password',
  };

  describe('POST /auth/register', () => {
    it('should return 201 and create new user', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201);
    });

    it('should return JWT token cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201);
      expect(response.headers['set-cookie'][0]).toContain('token');
    });

    it('should return 403 if user already exists', async () => {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          hashed_password: 'password',
          icon: 'WHITE',
        },
      });

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(403);
    });

    const invalidUserFields = [
      { name: '', email: 'test@test.com', password: 'test' },
      { name: undefined, email: 'test@test.com', password: 'test' },
      { name: 'a'.repeat(256), email: 'test@test.com', password: 'test' },
      { name: 'test', email: '', password: 'test' },
      { name: 'test', email: undefined, password: 'test' },
      { name: 'test', email: 'a'.repeat(256), password: 'test' },
      { name: 'test', email: 'test@test.com', password: '' },
      { name: 'test', email: 'test@test.com', password: undefined },
      { name: 'test', email: 'test@test.com', password: 'a'.repeat(256) },
    ];

    invalidUserFields.forEach((userFields, index) => {
      it(`should return 400 for invalid user fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send(userFields)
          .expect(400);
      });
    });
  });
});
