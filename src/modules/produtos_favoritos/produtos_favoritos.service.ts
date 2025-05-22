/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { UpdateListaProdutosFavoritoDto } from './dto/update-lista-produtos_favorito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../../modules/cliente/entities/cliente.entity';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';

@Injectable()
export class ProdutosFavoritosService {
  constructor(
    @InjectRepository(ListaProdutoFavorito)
    private repository: Repository<ListaProdutoFavorito>,
    private readonly fakeStoreClient: FakeStoreClient,
  ) {}

  async create(dto: CreateListaProdutoFavoritoDto) {
    const produto = await this.fakeStoreClient.getProductById(dto.produtoId);

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    const produtoFavorito = {
      id_cliente: dto.clienteId,
      titulo: produto.title,
      imagem: produto.image,
      preco: produto.price,
      avaliacao: produto.rating.rate,
      contador: produto.rating.count,
    };

    const favorito = this.repository.create(produtoFavorito);
    return this.repository.save(favorito);
  }

  async findAll() {
    return this.repository.find();
  }

  async findByCliente(clienteId: number) {
    return this.repository.find({ where: { cliente: { id: clienteId } } });
  }

  async update(id: number, dto: UpdateListaProdutosFavoritoDto) {
    const produto = await this.fakeStoreClient.getProductById(dto.produtoId);

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return this.repository.update(+id, {
      clienteId: dto.clienteId,
      ...produto,
    });
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
