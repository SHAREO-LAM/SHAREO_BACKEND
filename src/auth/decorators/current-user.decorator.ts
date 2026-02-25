import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from '../../entities/entities/Users';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any).user as User;
  },
);
