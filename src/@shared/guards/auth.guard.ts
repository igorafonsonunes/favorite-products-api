import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { importJWK, jwtVerify } from 'jose';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    if (!authorization) {
      return false;
    }
    const token = authorization.split(' ')[1];

    const { payload } = await this.validateToken(token);
    request['user'] = payload;
    return true;
  }

  async validateToken(token: string) {
    try {
      const jwk = await importJWK({
        k: 'ZGVzYWZpb19wcm9kdXRvc19mYXZvcml0b3M=',
        alg: 'HS256',
        kty: 'oct',
      });

      return await jwtVerify(token, jwk);
    } catch (error) {
      throw new BadRequestException('Token Invalido!');
    }
  }
}
