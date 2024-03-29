import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

/**
 * Use this function to set user tokens for Protected routes
 * @param app : INestApplication
 * @param prisma : PrismaService
 * @returns Promise<void>
 */
export const authSetTokens = async (app: INestApplication) => {
  let jwtToken: string;

  // Login a user
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password',
  });

  // Extract the JWT token from the response
  const jwtCookies = response.headers['set-cookie'];

  if (jwtCookies && jwtCookies.length) {
    const jwtCookie = jwtCookies[0];
    jwtToken = jwtCookie.split('=')[1].split(';')[0];
  }

  const csrfResponse = await request(app.getHttpServer()).get(
    '/auth/csrf-token',
  );

  const csrfToken = csrfResponse.body.csrfToken;

  return {
    jwtToken,
    csrfToken,
  };
};
