import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProdutosFavoritosService } from './produtos_favoritos.service';
import { CreateListaProdutoFavoritoDto } from './dto/create-lista-produtos_favorito.dto';
import { AuthGuard } from '../../@shared/guards/auth.guard';
import { Roles } from '../../@shared/decorators/roles.decorator';
import { RolesGuard } from '../../@shared/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('produtos-favoritos')
export class ProdutosFavoritosController {
  constructor(
    private readonly produtosFavoritosService: ProdutosFavoritosService,
  ) {}

  @Post()
  @Roles('USER', 'ADMIN')
  create(@Body() createProdutosFavoritoDto: CreateListaProdutoFavoritoDto) {
    return this.produtosFavoritosService.create(createProdutosFavoritoDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.produtosFavoritosService.findAll();
  }

  @Get(':id')
  @Roles('USER', 'ADMIN')
  findOne(@Param('id') id: string) {
    return this.produtosFavoritosService.findByCliente(+id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.produtosFavoritosService.remove(+id);
  }
}
