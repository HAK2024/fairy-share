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

  describe('CREATE /houses', () => {
    const dto = {
      name: 'House 1',
      isExpensePerTime: false,
      rules: [
        {
          text: 'Rule 1',
        },
        {
          text: 'Rule 2',
        },
      ],
    };

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get('/houses/106').expect(401);
    });

    it('should return 201 and house data if authenticated', async () => {
      await request(app.getHttpServer())
        .post('/houses')
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject(dto);
        });
    });

    it('should return isAdmin as true for the user who created the house', async () => {
      const response = await request(app.getHttpServer())
        .post('/houses')
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201);

      expect(response.body.isAdmin).toBe(true);
    });
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

  describe('PUT /houses/:houseId', () => {
    const houseId = 106;
    const ruleId = 121;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).put(`/houses/${houseId}`).expect(401);
    });

    it('should updated all the data', async () => {
      const updatedDto = {
        name: 'House 1',
        isExpensePerTime: true,
        rules: [
          {
            id: ruleId,
            text: 'Rule Updated',
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .put(`/houses/${houseId}`)
        .send(updatedDto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body).toMatchObject(updatedDto);
    });

    it('should create the rules for the house', async () => {
      const updatedDto = {
        name: 'House 1',
        isExpensePerTime: true,
        rules: [
          {
            id: null,
            text: 'New Rule 1',
          },
          {
            id: null,
            text: 'New Rule 2',
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .put(`/houses/${houseId}`)
        .send(updatedDto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.rules).toHaveLength(2);
    });

    it('should delete the rules that are not in the updated data', async () => {
      const updatedDto = {
        name: 'House 1',
        isExpensePerTime: true,
        rules: [],
      };

      const response = await request(app.getHttpServer())
        .put(`/houses/${houseId}`)
        .send(updatedDto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.rules).toHaveLength(0);
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

  describe('DELETE /houses/:houseId', () => {
    const houseId = 106;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .delete(`/houses/${houseId}`)
        .expect(401);
    });

    it('should return success message with 200', async () => {
      await request(app.getHttpServer())
        .delete(`/houses/${houseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200)
        .expect({ message: 'House deleted successfully.' });
    });
  });
});
