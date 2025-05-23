import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { AuthGuard } from '../../@shared/guards/auth.guard';
import { Roles } from '../../@shared/decorators/roles.decorator';
import { RolesGuard } from '../../@shared/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('produtos')
@Roles('ADMIN', 'USER')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }
}
