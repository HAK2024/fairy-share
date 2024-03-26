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
    beforeAll(async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;
    });

    const houseId = 109; // Default houseId for the tests
    const userId = 104; // Default userId for the tests

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          userId,
          houseId,
          isAdmin: true,
        })
        .expect(401);
    });

    it('should return 403 if user is not the admin', async () => {
      // Log in as a non-admin user
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'evan@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          userId,
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });

    it('should return 404 if userHouse does not exist', async () => {
      // Use IDs that are unlikely to exist
      const houseId = 10000;
      const userId = 10000;

      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          userId,
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 400 if user is trying to update their own status', async () => {
      // Log in as an admin user
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          userId, // Assuming this user matches the loggedIn user
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(400);
    });

    it('should return 200 and change admin status to true', async () => {
      const userId = 105; // Assuming this user is the member of the logged-in user house

      const response = await request(app.getHttpServer())
        .put('/user-houses/admin')
        .send({
          userId,
          houseId,
          isAdmin: true,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.isAdmin).toBe(true);
    });
  });

  describe('DELETE /user-houses/:houseId', () => {
    const houseId = 106; // Default houseId for the tests
    const userId = 101; // Default userId for the tests

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .delete(`/user-houses/${houseId}`)
        .send({
          userId,
        })
        .expect(401);
    });

    it('should return 403 if user is not the admin', async () => {
      // Log in as a non-admin user
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'bob@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      const houseId = 107; // Logged-in user house

      await request(app.getHttpServer())
        .delete(`/user-houses/${houseId}`)
        .send({
          userId,
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });

    it('should return 404 if userHouse does not exist', async () => {
      // Log in as an admin
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      // Use IDs that are unlikely to exist
      const houseId = 10000;
      const userId = 10000;

      await request(app.getHttpServer())
        .delete(`/user-houses/${houseId}`)
        .send({
          userId,
          houseId,
          isAdmin: false,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 400 if user is trying to remove themselves', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com', // Assuming this user matches the userId
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .delete(`/user-houses/${houseId}`)
        .send({
          userId,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(400);
    });

    it('should return 200', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com', // An admin user
          password: 'password',
        });

      token = await loginUser.body.accessToken;
      const houseId = 109; // Assuming this house is the logged-in user house
      const userId = 105; // Assuming this user is the member of the logged-in user house

      await request(app.getHttpServer())
        .delete(`/user-houses/${houseId}`)
        .send({
          userId,
        })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);
    });
  });
});
