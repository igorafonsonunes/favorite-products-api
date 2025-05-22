import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosFavoritosController } from './produtos_favoritos.controller';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { UpdateListaProdutosFavoritoDto } from './dto/update-lista-produtos_favorito.dto';

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
      const dto: CreateListaProdutoFavoritoDto = {
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

  describe('update', () => {
    it('should update a produto favorito', async () => {
      const id = 1;
      const dto: UpdateListaProdutosFavoritoDto = {
        titulo: 'Atualizado',
        imagem: 'atualizado.jpg',
        preco: 12.99,
        avaliacao: 4,
        contador: 2,
      };
      const result = await controller.update(id.toString(), dto);
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
