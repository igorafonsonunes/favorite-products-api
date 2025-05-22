/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

describe('ClienteService', () => {
  let service: ClienteService;
  let repo: Repository<Cliente>;

  const mockClientes = [
    { id: 1, nome: 'João', email: 'joao@example.com' },
    { id: 2, nome: 'Maria', email: 'maria@example.com' },
  ];

  const mockRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    find: jest.fn(() => Promise.resolve(mockClientes)),
    findOneBy: jest.fn(({ id }) =>
      Promise.resolve(mockClientes.find((c) => c.id === id)),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ affected: 1 })),
    delete: jest.fn((id) => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: getRepositoryToken(Cliente), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cliente', async () => {
    const dto = { nome: 'Carlos', email: 'carlos@example.com' };
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(dto.nome);
  });

  it('should find all clientes', async () => {
    const clientes = await service.findAll();
    expect(clientes).toHaveLength(2);
  });

  it('should find one cliente', async () => {
    const cliente = await service.findOne(1);
    expect(cliente).toBeDefined();
    expect(cliente.id).toBe(1);
  });

  it('should update a cliente', async () => {
    const result = await service.update(1, { nome: 'João Atualizado' });
    expect(result).toHaveProperty('affected', 1);
  });

  it('should delete a cliente', async () => {
    const result = await service.remove(1);
    expect(result).toHaveProperty('affected', 1);
  });
});
