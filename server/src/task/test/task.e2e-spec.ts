import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules, resetData } from '../../../test';
import { TaskModule } from '../task.module';
import {
  validCreateTaskField,
  invalidCreateTaskFields,
  invalidUpdateTaskFields,
  validUpdateTaskField,
} from './data';
import { describe } from 'node:test';
import { taskData, userData } from '../../prisma/seedData';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let csrfToken: string;

  beforeAll(async () => {
    await resetData();

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

  describe('GET /tasks', () => {
    const houseId = 106;

    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get(`/tasks`).expect(401);
    });

    it('should return 200 and tasks data if authenticated', async () => {
      const userSeedData = await userData();
      const taskSeedData = await taskData();
      const expectedTasksData = taskSeedData
        .map((task) => {
          const user = userSeedData.find((user) => user.id === task.assigneeId);

          return {
            ...task,
            date: task.date.toISOString(),
            user: {
              id: user?.id,
              name: user?.name,
              icon: user?.icon,
            },
          };
        })
        .filter((task) => task.houseId === houseId);

      const response = await request(app.getHttpServer())
        .get('/tasks')
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body).toEqual(expect.arrayContaining(expectedTasksData));
    });
  });

  describe('GET /tasks/:taskId', () => {
    const taskId = 126;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).get(`/tasks/${taskId}`).expect(401);
    });

    it('should return 200 and the task data if authenticated', async () => {
      const expectedTaskData = {
        id: taskId,
        title: 'Garden Maintenance',
        date: '2024-05-15T00:00:00.000Z',
        note: 'Trim the hedges and mow the lawn',
        houseId: 106,
        assigneeId: 101,
        isCompleted: false,
      };

      const response = await request(app.getHttpServer())
        .get(`/tasks/${taskId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body).toMatchObject(expectedTaskData);
    });
  });

  describe('POST /tasks', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).post(`/tasks`).expect(401);
    });

    invalidCreateTaskFields.forEach((invalidTaskField, index) => {
      it(`should return 400 for invalid task fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/tasks')
          .send(invalidTaskField)
          .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
          .set('x-csrf-token', csrfToken)
          .expect(400);
      });
    });

    it('should return 201 and the task data if authenticated', async () => {
      const expectedTaskData = {
        id: expect.any(Number),
        title: 'Valid Title',
        date: '2024-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      };

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(validCreateTaskField)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201);

      expect(response.body).toMatchObject(expectedTaskData);
    });
  });

  describe('PUT /tasks/:taskId', () => {
    const taskId = 126;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).put(`/tasks/${taskId}`).expect(401);
    });

    invalidUpdateTaskFields.forEach((invalidTaskField, index) => {
      it(`should return 400 for invalid task fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .put(`/tasks/${taskId}`)
          .send(invalidTaskField)
          .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
          .set('x-csrf-token', csrfToken)
          .expect(400);
      });
    });

    it('should return 200 and task data if authenticated', async () => {
      const expectedTaskData = {
        id: expect.any(Number),
        title: 'Valid Title',
        date: '2024-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
      };

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .send(validUpdateTaskField)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body).toMatchObject(expectedTaskData);
    });
  });

  describe('PUT /tasks/:taskId/status', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).put('/tasks/126/status').expect(401);
    });

    const updateTaskStatus = async (taskId: number, isCompleted: boolean) => {
      return request(app.getHttpServer())
        .put(`/tasks/${taskId}/status`)
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
  });

  describe('DELETE /tasks/:taskId', () => {
    const taskId = 126;
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).delete(`/tasks/${taskId}`).expect(401);
    });

    it('should return 204 if authenticated', async () => {
      return request(app.getHttpServer())
        .delete(`/tasks/${taskId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(204);
    });
  });
});
