import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface CustomRequest extends Request {
  house?: any;
}

export const GetHouse = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();

    if (data) {
      return request.house ? request.house[data] : undefined;
    }

    return request.house;
  },
);
