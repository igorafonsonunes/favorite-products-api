import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ProdutosController],
  providers: [ProdutosService, FakeStoreClient],
})
export class ProdutosModule {}
