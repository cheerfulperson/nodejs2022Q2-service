import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { AuthService } from 'src/modules/auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IncomingMessage = context.switchToHttp().getRequest();
    const bearer: string | undefined =
      req.headers['authorization'] || (req.headers['Authorization'] as string);
    const allowUnauthorizedRequest =
      this.reflector.get<boolean | undefined>(
        'allowUnauthorizedRequest',
        context.getHandler(),
      ) ?? false;

    if (allowUnauthorizedRequest) {
      return true;
    }
    if (
      !(await this.authService.verify(bearer?.split(' ')[1] || '')) ||
      bearer?.split(' ')[0] !== 'Bearer'
    ) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
