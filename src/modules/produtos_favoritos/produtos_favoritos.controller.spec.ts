import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosFavoritosController } from './produtos_favoritos.controller';
import { ProdutosFavoritosService } from './produtos_favoritos.service';

describe('ProdutosFavoritosController', () => {
  let controller: ProdutosFavoritosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosFavoritosController],
      providers: [ProdutosFavoritosService],
    }).compile();

    controller = module.get<ProdutosFavoritosController>(
      ProdutosFavoritosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of produtos favoritos', async () => {
      const result = await controller.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a produto favorito by id', async () => {
      const id = 1;
      const result = await controller.findOne(id.toString());
      expect(result).toBeDefined();
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
      const result = await controller.create(dto);
      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should remove a produto favorito by id', async () => {
      const id = 1;
      const result = await controller.remove(id.toString());
      expect(result).toBeDefined();
    });
  });
});
