import { Injectable, NotFoundException } from '@nestjs/common';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';

@Injectable()
export class ProdutosService {
  constructor(private readonly fakeStoreClient: FakeStoreClient) {}

  async findAll() {
    return this.fakeStoreClient.getAllProducts();
  }

  async findOne(id: number) {
    const produto = await this.fakeStoreClient.getProductById(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }
}
