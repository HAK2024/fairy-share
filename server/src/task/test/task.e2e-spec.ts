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

    it('should update task status to true and return task data if authenticated', async () => {
      const taskId = 126;
      const response = await updateTaskStatus(taskId, true);
      expect(response.body).toMatchObject({ isCompleted: true });
    });

    it('should update task status to false and return task data if authenticated', async () => {
      const taskId = 127;
      const response = await updateTaskStatus(taskId, false);
      expect(response.body).toMatchObject({ isCompleted: false });
    });
  });
});
