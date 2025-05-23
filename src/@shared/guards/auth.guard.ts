import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    if (!authorization) {
      return false;
    }

    return this.validateToken(authorization);
  }

  validateToken(token: string): boolean {
    return token == 'ZGVzYWZpb19wcm9kdXRvc19mYXZvcml0b3M=';
  }
}
