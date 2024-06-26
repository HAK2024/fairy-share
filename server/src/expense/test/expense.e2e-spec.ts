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

  describe('GET /expenses/per-date', () => {
    const expectedExpenseData = [
      {
        month: 'April 2024',
        expenses: [
          {
            date: 'APR 30',
            buyers: [
              {
                buyerId: '104',
                expenses: [
                  {
                    id: 115,
                    itemName: 'Maintenance Fee',
                    fee: 150,
                    date: '2024-04-30T00:00:00.000Z',
                    houseId: 109,
                    buyerId: 104,
                    payments: [
                      {
                        id: 120,
                        fee: 150,
                        paidDate: '2024-05-05T00:00:00.000Z',
                        user: {
                          id: 105,
                          name: 'Evan',
                          icon: 'VIOLET',
                        },
                      },
                    ],
                    user: {
                      id: 104,
                      name: 'Diana',
                      icon: 'INDIGO',
                    },
                  },
                ],
              },
            ],
          },
          {
            date: 'APR 25',
            buyers: [
              {
                buyerId: '104',
                expenses: [
                  {
                    id: 114,
                    itemName: 'Groceries',
                    fee: 200,
                    date: '2024-04-25T00:00:00.000Z',
                    houseId: 109,
                    buyerId: 104,
                    payments: [
                      {
                        id: 119,
                        fee: 100,
                        paidDate: '2024-04-30T00:00:00.000Z',
                        user: {
                          id: 105,
                          name: 'Evan',
                          icon: 'VIOLET',
                        },
                      },
                    ],
                    user: {
                      id: 104,
                      name: 'Diana',
                      icon: 'INDIGO',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        month: 'March 2024',
        expenses: [],
      },
      {
        month: 'February 2024',
        expenses: [],
      },
    ];

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get('/expenses/per-date').expect(401);
    });

    it('should return 200 and expense data if authenticated', async () => {
      await request(app.getHttpServer())
        .get('/expenses/per-date')
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(expectedExpenseData);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(3);
        });
    });
  });

  describe('GET /expenses/per-month', () => {
    const expectedExpenseData = [
      {
        month: 'April 2024',
        monthNumber: 4,
        year: 2024,
        usersExpenses: [
          {
            id: 104,
            name: 'Diana',
            icon: 'INDIGO',
            expenses: [
              {
                date: 'APR 30',
                expenses: [
                  {
                    id: 115,
                    itemName: 'Maintenance Fee',
                    fee: 150,
                    date: '2024-04-30T00:00:00.000Z',
                    houseId: 109,
                    buyerId: 104,
                    payments: [
                      {
                        id: 120,
                        fee: 150,
                        paidDate: '2024-05-05T00:00:00.000Z',
                        user: {
                          id: 105,
                          name: 'Evan',
                          icon: 'VIOLET',
                        },
                      },
                    ],
                    user: {
                      id: 104,
                      name: 'Diana',
                      icon: 'INDIGO',
                    },
                  },
                ],
              },
              {
                date: 'APR 25',
                expenses: [
                  {
                    id: 114,
                    itemName: 'Groceries',
                    fee: 200,
                    date: '2024-04-25T00:00:00.000Z',
                    houseId: 109,
                    buyerId: 104,
                    payments: [
                      {
                        id: 119,
                        fee: 100,
                        paidDate: '2024-04-30T00:00:00.000Z',
                        user: {
                          id: 105,
                          name: 'Evan',
                          icon: 'VIOLET',
                        },
                      },
                    ],
                    user: {
                      id: 104,
                      name: 'Diana',
                      icon: 'INDIGO',
                    },
                  },
                ],
              },
            ],
          },
        ],
        balanceSummary: [
          {
            payerId: 105,
            payerName: 'Evan',
            payerIcon: 'VIOLET',
            payees: [
              {
                payeeId: 104,
                fee: 250,
                payeeName: 'Diana',
                payeeIcon: 'INDIGO',
                paidDate: '2024-05-05T00:00:00.000Z',
              },
            ],
          },
        ],
      },
      {
        month: 'March 2024',
        monthNumber: 3,
        year: 2024,
        usersExpenses: [],
        balanceSummary: [],
      },
      {
        month: 'February 2024',
        monthNumber: 2,
        year: 2024,
        usersExpenses: [],
        balanceSummary: [],
      },
    ];

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get('/expenses/per-month').expect(401);
    });

    it('should return 200 and expense data if authenticated', async () => {
      await request(app.getHttpServer())
        .get('/expenses/per-month')
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(expectedExpenseData);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(3);
        });
    });
  });

  describe('GET /expenses/:expenseId', () => {
    const expenseId = 115;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .expect(401);
    });

    it('should return 404 if expense does not exist.', async () => {
      const expenseId = 10000;

      await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 403 if user does not have permission to get this expense', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });

    it('should return 200 and the expense data if authenticated', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      const expectedExpenseData = {
        id: expenseId,
        itemName: 'Maintenance Fee',
        fee: 150,
        date: '2024-04-30T00:00:00.000Z',
        houseId: 109,
        buyerId: 104,
      };

      const response = await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body).toMatchObject(expectedExpenseData);
    });
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
            fee: 45, // Fee is split evenly among 2 members
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

    it('should return 403 if authenticated', async () => {
      const dto = {
        itemName: 'Expense 1',
        fee: 90,
        date: '2024-03-18T12:00:00.000Z',
        houseId: 10000, // houseId that does not user's house
      };

      await request(app.getHttpServer())
        .post('/expenses')
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
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

  describe('PUT /expenses/:expenseId', () => {
    const expenseId = 114; // Assume this expense matches the logged-in user expenseId
    const paymentId = 119; // Assume this payment matches the expenseId of the expense above

    const dto = {
      itemName: 'Updated Groceries',
      fee: 80,
      date: '2024-03-18T12:00:00.000Z',
    };

    const expectedExpenseData = {
      expense: {
        id: expenseId, // No change
        itemName: 'Updated Groceries',
        fee: 80,
        date: '2024-03-18T12:00:00.000Z',
        houseId: 109, // No change
        buyerId: 104, // No change
        payments: [
          {
            id: paymentId, // No change
            fee: 40,
            paidDate: '2024-04-30T00:00:00.000Z',
            expenseId: expenseId, // No change
            payerId: 105, // No change
          },
        ],
      },
    };

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .put(`/expenses/${expenseId}`)
        .send(dto)
        .expect(401);
    });

    it('should return 404 if expense does not exist', async () => {
      const expenseId = 10000; // Expense ID that is unlikely to exist

      await request(app.getHttpServer())
        .put(`/expenses/${expenseId}`)
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 403 if user is not the buyer', async () => {
      // the user who is not the buyer
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'evan@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put(`/expenses/${expenseId}`)
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(403);
    });

    it('should return 200 and updated expense data if authenticated', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      await request(app.getHttpServer())
        .put(`/expenses/${expenseId}`)
        .send(dto)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(expectedExpenseData);
        });
    });
  });

  describe('DELETE /tasks/:expenseId', () => {
    const expenseId = 114;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer())
        .delete(`/expenses/${expenseId}`)
        .expect(401);
    });

    it('should return 404 if expense does not exist', async () => {
      const expenseId = 10000; // Expense ID that is unlikely to exist

      return request(app.getHttpServer())
        .delete(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(404);
    });

    it('should return 401 if user is not the buyer', async () => {
      // Log in with the user who is not the buyer
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;

      return request(app.getHttpServer())
        .delete(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(401);
    });

    it('should return 204 and deleted the expense if authenticated', async () => {
      const loginUser = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'diana@example.com',
          password: 'password',
        });

      token = await loginUser.body.accessToken;
      return request(app.getHttpServer())
        .delete(`/expenses/${expenseId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(204);
    });
  });
});
