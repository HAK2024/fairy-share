import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules } from '../../../test';
import { HouseModule } from '../house.module';

describe('HouseController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules(), HouseModule],
      providers: [AuthGuard],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.init();
    app.setGlobalPrefix('api');

    const tokens = await authSetTokens(app);
    token = tokens.jwtToken;
    csrfToken = tokens.csrfToken;
  });

  afterAll(() => {
    app.close();
  });

  describe('GET /houses/:houseId', () => {
    const houseId = 106;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get(`/houses/${houseId}`).expect(401);
    });

    it('should return 200 and house data if authenticated', async () => {
      await request(app.getHttpServer())
        .get(`/houses/${houseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);
    });
  });

  describe('GET /houses/:houseId/todos', () => {
    const houseId = 106;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .get(`/houses/${houseId}/todos`)
        .expect(401);
    });

    it('should return 200 and todos data if authenticated', async () => {
      await request(app.getHttpServer())
        .get(`/houses/${houseId}/todos`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);
    });
  });
});
