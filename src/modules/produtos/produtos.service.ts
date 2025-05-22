import { Injectable } from '@nestjs/common';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';

@Injectable()
export class ProdutosService {
  constructor(private readonly fakeStoreClient: FakeStoreClient) {}

  findAll() {
    return this.fakeStoreClient.getAllProducts();
  }

  findOne(id: number) {
    return this.fakeStoreClient.getProductById(id);
  }
}
