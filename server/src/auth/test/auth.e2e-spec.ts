import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { buildDefaultModules, resetData } from '../../../test';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    await resetData();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules()],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
    app.setGlobalPrefix('api');
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    app.close();
  });

  const user1 = {
    name: 'Test1',
    email: 'Test1@test.com',
    password: 'password',
  };

  const user2 = {
    name: 'Test2',
    email: 'Test2@test.com',
    password: 'password',
  };

  const user3 = {
    name: 'Test3',
    email: 'Test3@test.com',
    password: 'password',
  };

  describe('POST /auth/register', () => {
    it('should return 201 and create new user', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(user1)
        .expect(201);
    });

    it('should return JWT token cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(user2)
        .expect(201);
      expect(response.headers['set-cookie'][0]).toContain('token');
    });

    it('should return 403 if user already exists', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(user1)
        .expect(403);
    });

    const invalidUserFields = [
      { name: '', email: 'test3@test.com', password: 'test' },
      { name: undefined, email: 'test3@test.com', password: 'test' },
      { name: 'a'.repeat(256), email: 'test3@test.com', password: 'test' },
      { name: 'test', email: '', password: 'test' },
      { name: 'test', email: undefined, password: 'test' },
      { name: 'test', email: 'a'.repeat(256), password: 'test' },
      { name: 'test', email: 'test3@test.com', password: '' },
      { name: 'test', email: 'test3@test.com', password: undefined },
      { name: 'test', email: 'test3@test.com', password: 'a'.repeat(256) },
    ];

    invalidUserFields.forEach((userFields, index) => {
      it(`should return 400 for invalid user fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send(userFields)
          .expect(400);
      });
    });

    it('if user is invited to a house that does not exist, should return 404', async () => {
      await request(app.getHttpServer())
        .post('/auth/register?invited_house_id=999')
        .send(user3)
        .expect(404);
    });

    it('if user is invited to a house, should add user to house after creating user account', async () => {
      const houseId = 106;
      const response = await request(app.getHttpServer())
        .post('/auth/register?invited_house_id=' + houseId)
        .send(user3);

      expect(response.status).toBe(201);

      const userHouse = await prismaService.userHouse.findFirst({
        where: {
          userId: response.body.id,
        },
      });

      expect(userHouse.houseId).toBe(houseId);
    });
  });

  describe('POST /auth/login', () => {
    it('should return 200 and JWT token cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user1.email, password: user1.password })
        .expect(200);
      expect(response.headers['set-cookie'][0]).toContain('token');
    });

    it('should return 401 for invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user1.email, password: 'invalid' })
        .expect(401);
    });

    const invalidLoginFields = [
      { email: '', password: 'test' },
      { email: undefined, password: 'test' },
      { email: 'a'.repeat(256), password: 'test' },
      { email: 'test3@test.com', password: '' },
      { email: 'test3@test.com', password: undefined },
      { email: 'test3@test.com', password: 'a'.repeat(256) },
    ];

    invalidLoginFields.forEach((userFields, index) => {
      it(`should return 400 for invalid login fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send(userFields)
          .expect(400);
      });
    });

    it('if user does not have any house yet and is invited to a house, add user to house', async () => {
      const houseId = 107;
      const response = await request(app.getHttpServer())
        .post('/auth/login?invited_house_id=' + houseId)
        .send({ email: user2.email, password: user2.password });

      expect(response.status).toBe(200);

      const userHouse = await prismaService.userHouse.findFirst({
        where: {
          userId: response.body.id,
        },
      });

      expect(userHouse.houseId).toBe(houseId);
    });
  });

  describe('POST /auth/logout', () => {
    it('should return 200 and clear token cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/logout')
        .expect(200);
      expect(response.headers['set-cookie'][0]).toContain('token=; Path=/;');
    });
  });

  describe('GET /auth/csrf-token', () => {
    it('should return 200 and set csrf-token cookie', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/csrf-token')
        .expect(200);
      expect(response.headers['set-cookie'][0]).toContain('csrf-token');
    });
  });
});
