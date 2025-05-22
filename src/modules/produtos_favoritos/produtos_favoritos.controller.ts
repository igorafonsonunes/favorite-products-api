import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { UpdateListaProdutosFavoritoDto } from './dto/update-lista-produtos_favorito.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutosFavoritoDto: UpdateListaProdutosFavoritoDto,
  ) {
    return this.produtosFavoritosService.update(+id, updateProdutosFavoritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosFavoritosService.remove(+id);
  }
}
