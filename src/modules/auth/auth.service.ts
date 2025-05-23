import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { importJWK, SignJWT } from 'jose';

@Injectable()
export class AuthService {
  constructor() {}

  async auth(authDto: AuthDto) {
    if (!this.validateCredentials(authDto))
      throw new BadRequestException('Usuário Invalido!');

    return this.buildJTW(authDto.username);
  }

  private validateCredentials(authDto: AuthDto): boolean {
    const { username, password } = authDto;

    if (username === 'admin' && password === '123456') {
      return true;
    } else if (username === 'user' && password === '123456') {
      return true;
    }

    throw new BadRequestException('Usuário Invalido!');
  }

  private async buildJTW(username: string): Promise<string> {
    try {
      const jwk = await importJWK({
        k: 'ZGVzYWZpb19wcm9kdXRvc19mYXZvcml0b3M=',
        alg: 'HS256',
        kty: 'oct',
      });
      const role = username === 'admin' ? 'ADMIN' : 'USER';

      const jwt = await new SignJWT({
        role: role,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(jwk);

      return jwt;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao gerar token');
    }
  }
}
