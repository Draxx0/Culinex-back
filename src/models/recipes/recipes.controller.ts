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
import { RecipesService } from './recipes.service';
import { RecipeCreateDTO } from './dto/recipe.create.dto';
import { RecipeUpdateDTO } from './dto/recipe.update.dto';
import { RecipesQueries } from './queries/queries';
import { GetRecipesDTO } from './dto/recipe.get.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll(@Query() queries: RecipesQueries) {
    return await this.recipesService.findAll(queries);
  }

  @Get('by-ingredients')
  async findRecipesByIngredients(
    @Body() body: GetRecipesDTO,
    @Query() queries: RecipesQueries,
  ) {
    return await this.recipesService.findRecipesByIngredients(body, queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }

  @Post()
  async create(@Body() body: RecipeCreateDTO) {
    return await this.recipesService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: RecipeUpdateDTO) {
    return await this.recipesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.recipesService.delete(id);
  }

  @Delete()
  async deleteAll() {
    return await this.recipesService.deleteAll();
  }
}
