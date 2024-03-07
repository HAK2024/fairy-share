import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

// Protect routes with JWT authentication and CSRF token validation
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor() {
    super();
  }
  handleRequest(
    err: Error | null,
    user: User | null,
    info: Record<string, any>,
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();

    const csrfToken = request.headers['x-csrf-token'];

    console.log('csrfToken', csrfToken);

    if (!csrfToken) {
      throw new UnauthorizedException('Invalid CSRF token');
    }

    const isValidCsrfToken = csrfToken == request.cookies['csrf-token'];

    if (!isValidCsrfToken) {
      throw new UnauthorizedException('Invalid CSRF token');
    }

    return super.handleRequest(err, user, info, context);
  }
}
