import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeCreateDTO } from './dto/recipe.create.dto';
import { RecipeUpdateDTO } from './dto/recipe.update.dto';
import { RecipesQueries } from './queries/queries';
import { GetRecipesDTO } from './dto/recipe.get.dto';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthorGuard } from 'src/guards/author.guard';
import { Author, AuthorBy } from 'src/decorator/author.decorator';

@Controller('recipes')
@UseGuards(AuthGuard, RolesGuard, AuthorGuard)
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
  @Roles([Role.ADMIN, Role.CONTRIBUTOR])
  async create(@Request() req: any, @Body() body: RecipeCreateDTO) {
    return await this.recipesService.create(req, body);
  }

  @Put(':id')
  @Roles([Role.ADMIN, Role.CONTRIBUTOR])
  @Author(AuthorBy.RECIPE)
  async update(@Param('id') id: string, @Body() body: RecipeUpdateDTO) {
    return await this.recipesService.update(id, body);
  }

  @Delete(':id')
  @Roles([Role.ADMIN, Role.CONTRIBUTOR])
  @Author(AuthorBy.RECIPE)
  async delete(@Param('id') id: string) {
    return await this.recipesService.delete(id);
  }

  @Delete()
  @Roles([Role.ADMIN])
  async deleteAll() {
    return await this.recipesService.deleteAll();
  }
}
