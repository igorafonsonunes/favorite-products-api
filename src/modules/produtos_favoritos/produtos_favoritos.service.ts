/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { UpdateListaProdutosFavoritoDto } from './dto/update-lista-produtos_favorito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../../modules/cliente/entities/cliente.entity';

@Injectable()
export class ProdutosFavoritosService {
  constructor(
    @InjectRepository(ListaProdutoFavorito)
    private repository: Repository<ListaProdutoFavorito>,
  ) {}

  create(dto: CreateListaProdutoFavoritoDto) {
    const favorito = this.repository.create({
      ...dto,
      cliente: { id: dto.clienteId } as Cliente,
    });
    return this.repository.save(favorito);
  }

  findAll() {
    return this.repository.find();
  }

  findByCliente(clienteId: number) {
    return this.repository.find({ where: { cliente: { id: clienteId } } });
  }

  update(id: number, dto: UpdateListaProdutosFavoritoDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
