import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { AuthGuard } from '../../@shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('produtos')
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
