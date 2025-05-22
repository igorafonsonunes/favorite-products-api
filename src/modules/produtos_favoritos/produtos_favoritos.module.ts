import { Module } from '@nestjs/common';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { ProdutosFavoritosController } from './produtos_favoritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { HttpModule } from '@nestjs/axios';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';

@Module({
  imports: [TypeOrmModule.forFeature([ListaProdutoFavorito]), HttpModule],
  controllers: [ProdutosFavoritosController],
  providers: [ProdutosFavoritosService, FakeStoreClient],
})
export class ProdutosFavoritosModule {}
