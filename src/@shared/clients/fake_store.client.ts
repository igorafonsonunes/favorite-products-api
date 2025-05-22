import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FakeStoreClient {
  constructor(private httpService: HttpService) {}

  async getAllProducts(): Promise<any> {
    return this.httpService.axiosRef
      .get('https://fakestoreapi.com/products')
      .then((response) => response.data);
  }

  async getProductById(id: number): Promise<any> {
    return this.httpService.axiosRef
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.data);
  }
}
