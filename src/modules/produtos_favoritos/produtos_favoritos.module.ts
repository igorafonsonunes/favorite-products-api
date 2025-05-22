import { Module } from '@nestjs/common';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { ProdutosFavoritosController } from './produtos_favoritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { HttpModule } from '@nestjs/axios';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';
import { ClienteService } from '../cliente/cliente.service';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListaProdutoFavorito]),
    HttpModule,
    ClienteModule,
  ],
  controllers: [ProdutosFavoritosController],
  providers: [ProdutosFavoritosService, FakeStoreClient, ClienteService],
})
export class ProdutosFavoritosModule {}
