import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules, resetData } from '../../../test';
import { ExpenseModule } from '../expense.module';

describe('ExpenseController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    await resetData();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules(), ExpenseModule],
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

  describe('CREATE /expenses', () => {
    const dto = {
      itemName: 'Expense 1',
      fee: 90,
      date: '2024-03-18T12:00:00.000Z',
      houseId: 109,
    };

    const expectedExpenseData = {
      expense: {
        id: expect.any(Number),
        itemName: 'Expense 1',
        fee: 90,
        date: '2024-03-18T12:00:00.000Z',
        houseId: 109, // Assuming this house matches the logged-in user houseId
        buyerId: 104, // Assuming this user matches the logged-in userId
        payments: [
          {
            id: expect.any(Number),
            fee: 45, // fee / numberOfMember (90 / 2)
            paidDate: null,
            expenseId: expect.any(Number),
            payerId: 105, // Assuming this user matches the house member userId
          },
        ],
      },
    };

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .post('/expenses')
        .send(dto)
        .expect(401);
    });

    it('should return 201 and expense data if authenticated', async () => {
      await request(app.getHttpServer())
        .post('/expenses')
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject(expectedExpenseData);
        });
    });
  });
});
