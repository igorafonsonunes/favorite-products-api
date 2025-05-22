/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([{ id: 1, nome: 'Teste', email: 'teste@example.com' }]),
    ),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, nome: 'Teste', email: 'teste@example.com' }),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ affected: 1 })),
    remove: jest.fn((id) => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [{ provide: ClienteService, useValue: mockService }],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cliente', async () => {
    const dto = { nome: 'Novo Cliente', email: 'novo@cliente.com' };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id');
  });

  it('should return all clientes', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should return one cliente', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('should update a cliente', async () => {
    const result = await controller.update('1', { nome: 'Atualizado' });
    expect(service.update).toHaveBeenCalledWith(1, { nome: 'Atualizado' });
    expect(result).toHaveProperty('affected', 1);
  });

  it('should remove a cliente', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toHaveProperty('affected', 1);
  });
});
