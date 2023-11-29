import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientCreateDTO } from './dto/ingredient.create.dto';
import { IngredientUpdateDTO } from './dto/ingredient.update.dto';
import { IngredientQueries } from './queries/queries';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll(@Query() queries: IngredientQueries) {
    return await this.ingredientsService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ingredientsService.findOne(id);
  }

  @Post()
  async create(@Body() body: IngredientCreateDTO) {
    return await this.ingredientsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: IngredientUpdateDTO) {
    return await this.ingredientsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ingredientsService.delete(id);
  }

  @Delete()
  async deleteAll() {
    return await this.ingredientsService.deleteAll();
  }
}
