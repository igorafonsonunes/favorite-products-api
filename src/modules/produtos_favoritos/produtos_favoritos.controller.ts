import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';

@Controller('produtos-favoritos')
export class ProdutosFavoritosController {
  constructor(
    private readonly produtosFavoritosService: ProdutosFavoritosService,
  ) {}

  @Post()
  create(@Body() createProdutosFavoritoDto: CreateListaProdutoFavoritoDto) {
    return this.produtosFavoritosService.create(createProdutosFavoritoDto);
  }

  @Get()
  findAll() {
    return this.produtosFavoritosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosFavoritosService.findByCliente(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosFavoritosService.remove(+id);
  }
}
