import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListaProdutoFavorito } from './entities/lista_produtos_favorito.entity';
import { Repository } from 'typeorm';

describe('ProdutosFavoritosService', () => {
  let service: ProdutosFavoritosService;
  let repository: Repository<ListaProdutoFavorito>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosFavoritosService,
        {
          provide: getRepositoryToken(ListaProdutoFavorito),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProdutosFavoritosService>(ProdutosFavoritosService);
    repository = module.get<Repository<ListaProdutoFavorito>>(
      getRepositoryToken(ListaProdutoFavorito),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of produtos favoritos', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
    });

    it('should call the repository find method', async () => {
      await service.findAll();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a produto favorito by id', async () => {
      const id = 1;
      const result = await service.findByCliente(id);
      expect(result).toBeDefined();
    });

    it('should call the repository findOne method', async () => {
      const id = 1;
      await service.findByCliente(id);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a new produto favorito', async () => {
      const dto = {
        clienteId: 1,
        titulo: 'Teste',
        imagem: 'teste.jpg',
        preco: 10.99,
        avaliacao: 5,
        contador: 1,
      };
      const result = await service.create(dto);
      expect(result).toBeDefined();
    });

    it('should call the repository create and save methods', async () => {
      const dto = {
        clienteId: 1,
        titulo: 'Teste',
        imagem: 'teste.jpg',
        preco: 10.99,
        avaliacao: 5,
        contador: 1,
      };
      await service.create(dto);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a produto favorito', async () => {
      const id = 1;
      const dto = {
        titulo: 'Atualizado',
        imagem: 'atualizado.jpg',
        preco: 12.99,
        avaliacao: 4,
        contador: 2,
      };
      const result = await service.update(id, dto);
      expect(result).toBeDefined();
    });

    it('should call the repository update method', async () => {
      const id = 1;
      const dto = {
        titulo: 'Atualizado',
        imagem: 'atualizado.jpg',
        preco: 12.99,
        avaliacao: 4,
        contador: 2,
      };
      await service.update(id, dto);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a produto favorito by id', async () => {
      const id = 1;
      const result = await service.remove(id);
      expect(result).toBeDefined();
    });

    it('should call the repository delete method', async () => {
      const id = 1;
      await service.remove(id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
