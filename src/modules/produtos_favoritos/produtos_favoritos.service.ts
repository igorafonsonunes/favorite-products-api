import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { FakeStoreClient } from '../../@shared/clients/fake_store.client';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/entities/cliente.entity';

@Injectable()
export class ProdutosFavoritosService {
  constructor(
    @InjectRepository(ListaProdutoFavorito)
    private repository: Repository<ListaProdutoFavorito>,
    private readonly fakeStoreClient: FakeStoreClient,
    private readonly clienteService: ClienteService,
  ) {}

  async create(dto: CreateListaProdutoFavoritoDto) {
    if (!dto.clienteId || !dto.produtoId) {
      throw new BadRequestException('ClienteId e ProdutoId são obrigatórios.');
    }

    const produto = await this.fakeStoreClient.getProductById(dto.produtoId);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const cliente = await this.clienteService.findOne(dto.clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    const existente = await this.repository.findOne({
      where: {
        cliente: { id: cliente.id },
        titulo: produto.title,
      },
    });

    if (existente) {
      throw new ConflictException(
        'Este produto já está nos favoritos do cliente.',
      );
    }

    const favorito = this.repository.create({
      cliente: cliente as Cliente,
      titulo: produto.title,
      imagem: produto.image,
      preco: produto.price,
      avaliacao: produto.rating.rate,
      contador: produto.rating.count,
    });

    try {
      return await this.repository.save(favorito);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar produto favorito.',
      );
    }
  }

  async findAll() {
    return this.repository.find({ relations: ['cliente'] });
  }

  async findByCliente(clienteId: number) {
    const cliente = await this.clienteService.findOne(clienteId);
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return this.repository.find({ where: { cliente: { id: clienteId } } });
  }

  async remove(id: number) {
    const favorito = await this.repository.findOneBy({ id });
    if (!favorito) {
      throw new NotFoundException('Produto favorito não encontrado.');
    }

    return this.repository.delete(id);
  }
}
