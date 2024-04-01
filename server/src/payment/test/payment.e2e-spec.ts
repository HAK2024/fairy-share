import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules, resetData } from '../../../test';
import { PaymentModule } from '../payment.module';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    await resetData();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules(), PaymentModule],
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

    const loginUser = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'diana@example.com',
        password: 'password',
      });

    token = await loginUser.body.accessToken;
  });

  afterAll(() => {
    app.close();
  });

  describe('PUT /payments/:paymentId/status', () => {
    const paymentId = 119;
    const dto = {
      isPaid: true,
    };

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto)
        .expect(401);
    });

    it('should return 404 if payment Id does not exist', async () => {
      const paymentId = 10000; // payment Id that is unlikely to exist

      await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 200 and paidDate is not null and is a valid date', async () => {
      await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('paidDate');
          expect(new Date(res.body.paidDate)).toBeInstanceOf(Date);
        });
    });
  });
});
