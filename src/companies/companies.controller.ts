import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('companies')
export class CompaniesController {
  @Get()
  findAll() {
    return 'Listagem de empresas';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Empresa ${id}`;
  }

  @Post()
  async create(@Body() body: any) {
    return `Empresa criada`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return `Empresa atualizada`;
  }
}
