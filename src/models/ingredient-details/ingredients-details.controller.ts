import { Controller, Delete, Get, Param } from '@nestjs/common';
import { IngredientsDetailsService } from './ingredients-details.service';

@Controller('ingredients-details')
export class IngredientsDetailsController {
  constructor(
    private readonly ingredientsDetailsService: IngredientsDetailsService,
  ) {}

  @Get()
  async findAll() {
    return await this.ingredientsDetailsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ingredientsDetailsService.delete(id);
  }

  @Delete()
  async deleteAll() {
    return await this.ingredientsDetailsService.deleteAll();
  }
}
