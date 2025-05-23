import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProdutosFavoritosModule } from './modules/produtos_favoritos/produtos_favoritos.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClienteModule,
    ProdutosFavoritosModule,
    ProdutosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
