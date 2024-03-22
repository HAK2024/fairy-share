import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules, resetData } from '../../../test';
import { UserHouseModule } from '../user-house.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('UserHouseController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    await resetData();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules(), UserHouseModule],
      providers: [AuthGuard],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
    app.setGlobalPrefix('api');

    const tokens = await authSetTokens(app);
    token = tokens.jwtToken;
    csrfToken = tokens.csrfToken;
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    app.close();
  });

  describe('POST /user-houses', () => {
    const houseId = 106;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .post('/user-houses')
        .send({
          houseId: houseId.toString(),
        })
        .expect(401);
    });

    it('should return 409 if user already has a house', async () => {
      await request(app.getHttpServer())
        .post('/user-houses')
        .send({
          houseId: houseId.toString(),
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(409);
    });

    it('should return 201 and add user to house if the user does not have a house', async () => {
      // Create a user without a house
      const newUser = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'New User',
          email: 'user@gmail.com',
          password: 'password',
        });

      token = await newUser.body.accessToken;

      const response = await request(app.getHttpServer())
        .post('/user-houses')
        .send({
          houseId: houseId.toString(),
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201);

      expect(response.body.createdUserHouse).toMatchObject({ houseId });
    });
  });

  describe('PUT /user-houses/admin', () => {
    const houseId = 106;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          houseId,
          isAdmin: true,
        })
        .expect(401);
    });

    it('should return 400 if user is the only admin in the house', async () => {
      // Test with the user who is the only admin in the house
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(400);
    });

    it('should return 200 and change admin status to true', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      const response = await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          houseId,
          isAdmin: true,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.isAdmin).toBe(true);
    });

    it('should return 403 if user is not an admin', async () => {
      // Test with the user who is the admin
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'bob@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });
  });
});
