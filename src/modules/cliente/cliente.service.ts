import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto) {
    if (!this.isEmailValid(dto.email)) {
      throw new BadRequestException('E-mail inválido.');
    }

    const cliente = this.repository.create(dto);

    try {
      const saved = await this.repository.save(cliente);
      return { id: saved.id, nome: saved.nome, email: saved.email };
    } catch (error) {
      this.handleDatabaseError(error, 'Erro ao salvar cliente.');
    }
  }

  async findAll() {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar clientes.');
    }
  }

  async findOne(id: number) {
    try {
      const cliente = await this.repository.findOneBy({ id });
      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado.');
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar cliente.');
    }
  }

  async update(id: number, dto: UpdateClienteDto) {
    try {
      const existing = await this.repository.findOneBy({ id });
      if (!existing) {
        throw new NotFoundException('Cliente não encontrado.');
      }
      if (!this.isEmailValid(dto.email)) {
        throw new BadRequestException('E-mail inválido.');
      }

      await this.repository.update(id, dto);
      return { id, ...dto };
    } catch (error) {
      this.handleDatabaseError(error, 'Erro ao atualizar cliente.');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Cliente não encontrado para exclusão.');
      }
      return { message: 'Cliente removido com sucesso.' };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar cliente.');
    }
  }

  private isEmailValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private handleDatabaseError(error: any, defaultMessage: string): never {
    if (error instanceof QueryFailedError && (error as any).code === '23505') {
      throw new ConflictException('E-mail já cadastrado.');
    }
    throw new InternalServerErrorException(defaultMessage);
  }
}
