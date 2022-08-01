import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { AuthService } from 'src/modules/auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IncomingMessage = context.switchToHttp().getRequest();
    const bearer: string | undefined =
      req.headers['authorization'] || (req.headers['Authorization'] as string);
    console.log(
      await this.authService.verify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJlZTdkYWZjLWRiODItNDAyNi1hZTE3LWUzNzI3YzBkNTY4ZSIsImxvZ2luIjoic3RyaW5nIiwiaWF0IjoxNjU5Mzg5ODI2LCJleHAiOjE2NTkzOTM0MjZ9.xjH8udHsw40yLgEX4C2FxhnLWWWvsrKPe-G8ZPb3V_Q',
      ),
      req.url,
    );
    return true;
  }
}
