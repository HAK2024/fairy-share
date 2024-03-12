import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard';
import { authSetTokens, buildDefaultModules } from '../../../test';
import { TaskModule } from '../task.module';
import {
  validCreateTaskField,
  invalidCreateTaskFields,
  invalidUpdateTaskFields,
  validUpdateTaskField,
} from './data';
import { describe } from 'node:test';

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

  describe('POST /tasks/create', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.getHttpServer()).post(`/tasks/create`).expect(401);
    });

    invalidCreateTaskFields.forEach((invalidTaskField, index) => {
      it(`should return 400 for invalid task fields - case ${index + 1}`, async () => {
        await request(app.getHttpServer())
          .post('/tasks/create')
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
        date: '2023-03-18T12:00:00.000Z',
        note: 'Valid Note',
        assigneeId: 101,
        houseId: 106,
      };

      const response = await request(app.getHttpServer())
        .post('/tasks/create')
        .send(validCreateTaskField)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(201);

      expect(response.body).toMatchObject(expectedTaskData);
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
        date: '2023-04-15T07:00:00.000Z',
        note: 'Trim the hedges and mow the lawn',
        assigneeId: 101,
        houseId: 106,
      };

      const response = await request(app.getHttpServer())
        .get(`/tasks/${taskId}`)
        .set('Cookie', [`token=${token}`, `csrf-token=${csrfToken}`])
        .set('x-csrf-token', csrfToken)
        .expect(200);

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
        date: '2023-03-18T12:00:00.000Z',
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
