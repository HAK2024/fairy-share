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
    const paymentId = 120;

    const dto1 = {
      isPaid: false,
    };

    const expectedResponse1 = {
      id: 120,
      fee: 150,
      paidDate: null, // Should become null
      expenseId: 115,
      payerId: 105,
    };

    const dto2 = {
      isPaid: true,
    };

    const expectedResponse2 = {
      id: 120,
      fee: 150,
      paidDate: new Date(), // Should become new date from null
      expenseId: 115,
      payerId: 105,
    };

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto1)
        .expect(401);
    });

    it('should return 403 if user does not have permission to get this payment', async () => {
      await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto1)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });

    it('should return 200 and the updated payment with paidDate null', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'evan@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      const response = await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto1)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.paidDate).toBeNull();
      expect(response.body).toMatchObject({
        id: expectedResponse1.id,
        fee: expectedResponse1.fee,
        expenseId: expectedResponse1.expenseId,
        payerId: expectedResponse1.payerId,
      });
    });

    it('should return 200 and the updated payment with paidDate not null', async () => {
      const response = await request(app.getHttpServer())
        .put(`/payments/${paymentId}/status`)
        .send(dto2)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.paidDate).not.toBeNull();
      expect(new Date(response.body.paidDate)).toBeInstanceOf(Date);
      expect(response.body).toMatchObject({
        id: expectedResponse2.id,
        fee: expectedResponse2.fee,
        expenseId: expectedResponse2.expenseId,
        payerId: expectedResponse2.payerId,
      });
    });
  });

  describe('PUT /payments/status/per-month', () => {
    const dto1 = {
      year: 2023,
      month: 4,
      buyerId: 104,
      payerId: 105,
      isPaid: false,
      houseId: 109,
    };

    const expectedResponse1 = [
      {
        id: 119,
        fee: 100,
        paidDate: null,
        expenseId: 114,
        payerId: 105,
      },
      {
        id: 120,
        fee: 150,
        paidDate: null,
        expenseId: 115,
        payerId: 105,
      },
    ];

    const dto2 = {
      year: 2023,
      month: 4,
      buyerId: 104,
      payerId: 105,
      isPaid: false,
      houseId: 109,
    };

    const expectedResponse2 = [
      {
        id: 119,
        fee: 100,
        paidDate: new Date(),
        expenseId: 114,
        payerId: 105,
      },
      {
        id: 120,
        fee: 150,
        paidDate: new Date(),
        expenseId: 115,
        payerId: 105,
      },
    ];

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put('/payments/status/per-month')
        .send(dto1)
        .expect(401);
    });

    it('should return 200 and updated payments with paidDate null', async () => {
      const response = await request(app.getHttpServer())
        .put('/payments/status/per-month')
        .send(dto1)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      response.body.forEach(
        (
          payment: {
            id: number;
            fee: number;
            paidDate: null;
            expenseId: number;
            payerId: number;
          },
          index: number,
        ) => {
          expect(payment.paidDate).toBeNull();
          expect(payment).toMatchObject({
            id: expectedResponse1[index].id,
            fee: expectedResponse1[index].fee,
            expenseId: expectedResponse1[index].expenseId,
            payerId: expectedResponse1[index].payerId,
          });
        },
      );
    });

    it('should return 200 and updated payments with paidDate not null', async () => {
      const response = await request(app.getHttpServer())
        .put('/payments/status/per-month')
        .send(dto2)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      response.body.forEach(
        (
          payment: {
            id: number;
            fee: number;
            paidDate: Date;
            expenseId: number;
            payerId: number;
          },
          index: number,
        ) => {
          expect(payment.paidDate).not.toBeNull();
          expect(new Date(payment.paidDate)).toBeInstanceOf(Date);
          expect(payment).toMatchObject({
            id: expectedResponse2[index].id,
            fee: expectedResponse2[index].fee,
            expenseId: expectedResponse2[index].expenseId,
            payerId: expectedResponse2[index].payerId,
          });
        },
      );
    });
  });
});
