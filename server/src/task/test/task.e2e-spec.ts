import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules } from '../../../test';
import { TaskModule } from '../task.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...buildDefaultModules(), TaskModule],
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

  // create task test

  const createTask = {
    title: 'Valid Title',
    date: '2023-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  };

  describe('POST /tasks/create', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).post(`/tasks/create`).expect(401);
    });

    const invalidCreateTaskFields = [
      // Title tests
      {
        title: '',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },
      {
        title: undefined,
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },
      {
        title: 'a'.repeat(51),
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },

      // Date tests
      {
        title: 'Valid Title',
        date: '',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },

      {
        title: 'Valid Title',
        date: undefined,
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },
      {
        title: 'Valid Title',
        date: 'invalid-date',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      },

      // Note tests
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 1,
        assigneeId: 101,
        houseId: 106,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'a'.repeat(101),
        assigneeId: 101,
        houseId: 106,
      },

      // AssigneeId tests
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: '',
        houseId: 106,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: undefined,
        houseId: 106,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 'not-a-number',
        houseId: 106,
      },

      // houseId tests
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 106,
        houseId: '',
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 106,
        houseId: undefined,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 106,
        houseId: 'not-a-number',
      },
    ];

    invalidCreateTaskFields.forEach((taskField, index) => {
      it(`should return 400 for invalid task fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/tasks/create')
          .send(taskField)
          .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
          .set('x-csrf-token', csrfToken)
          .expect(400);
      });
    });

    it('should return 201 and task data if authenticated', async () => {
      await request(app.getHttpServer())
        .post('/tasks/create')
        .send(createTask)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201);
    });
  });

  const updateTask = {
    title: 'Valid Title',
    date: '2023-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
  };

  // update task test
  describe('PATCH /tasks/:taskId', () => {
    const taskId = 126;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).patch(`/tasks/${taskId}`).expect(401);
    });

    const invalidUpdateTaskFields = [
      // Title tests
      {
        title: '',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
      },
      {
        title: undefined,
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
      },
      {
        title: 'a'.repeat(51),
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
      },

      // Date tests
      { title: 'Valid Title', date: '', note: 'Valid Note', assigneeId: 101 },
      {
        title: 'Valid Title',
        date: undefined,
        note: 'Valid Note',
        assigneeId: 101,
      },
      {
        title: 'Valid Title',
        date: 'invalid-date',
        note: 'Valid Note',
        assigneeId: 101,
      },

      // Note tests
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 1,
        assigneeId: 101,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'a'.repeat(101),
        assigneeId: 101,
      },

      // AssigneeId tests
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: '',
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: undefined,
      },
      {
        title: 'Valid Title',
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 'not-a-number',
      },
    ];

    invalidUpdateTaskFields.forEach((taskField, index) => {
      it(`should return 400 for invalid task fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .patch(`/tasks/${taskId}`)
          .send(taskField)
          .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
          .set('x-csrf-token', csrfToken)
          .expect(400);
      });
    });

    it('should return 200 and task data if authenticated', async () => {
      await request(app.getHttpServer())
        .patch(`/tasks/${taskId}`)
        .send(updateTask)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);
    });
  });

  // update task status test

  describe('PATCH /tasks/:taskId/status', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).patch('/tasks/126/status').expect(401);
    });

    const updateTaskStatus = async (taskId: number, isCompleted: boolean) => {
      return request(app.getHttpServer())
        .patch(`/tasks/${taskId}/status`)
        .send({ isCompleted })
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);
    };

    it('should return 200 and task status if authenticated', async () => {
      const taskId = 126;
      const response = await updateTaskStatus(taskId, true);
      expect(response.body).toMatchObject({ isCompleted: true });
    });

    it('should return 200 and task status if authenticated', async () => {
      const taskId = 127;
      const response = await updateTaskStatus(taskId, false);
      expect(response.body).toMatchObject({ isCompleted: false });
    });

    // delete task test

    describe('DELETE /tasks/:taskId', () => {
      const taskId = 126;
      it('should return 401 if not authenticated', async () => {
        await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .expect(401);
      });

      it('should return 200 and task status if authenticated', async () => {
        return request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
          .set('x-csrf-token', csrfToken)
          .expect(200);
      });
    });
  });
});
