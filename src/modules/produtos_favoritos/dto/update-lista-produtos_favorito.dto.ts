import { PartialType } from '@nestjs/mapped-types';
import { CreateListaProdutoFavoritoDto } from './create-lista-produtos_favorito.dto';

export class UpdateListaProdutosFavoritoDto extends PartialType(
  CreateListaProdutoFavoritoDto,
) {}
