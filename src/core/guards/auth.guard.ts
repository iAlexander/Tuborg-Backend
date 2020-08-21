import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import {Config, Roles, RolesTokens} from '../config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: Config,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (this.isUnprotectedRoute(req.path)) {
      return true;
    }

    try {
      let token = req.header('authorization');

      if (!token) {
        throw new Error('No token provided');
      }

      token = token.replace('Bearer ', '');

      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      const roleTokens = roles.map(i => RolesTokens[Roles[i]]);

      if (!roleTokens.includes(token) && roles.length > 0) {
        throw new Error('role error');
      }

      return true;
    }
    catch (exception) {
      if (exception.toString().includes('role')) {
        throw new ForbiddenException(exception);
      }
      else {
        throw new UnauthorizedException(exception);
      }
    }
  }

  isUnprotectedRoute(url: string): boolean {
    return this.config.unprotectedRoutes.includes(url);
  }
}
