import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientCreateDTO } from './dto/ingredient.create.dto';
import { IngredientUpdateDTO } from './dto/ingredient.update.dto';
import { IngredientQueries } from './queries/queries';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('ingredients')
@UseGuards(AuthGuard, RolesGuard)
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
  @Roles(Role.ADMIN)
  async create(@Body() body: IngredientCreateDTO) {
    return await this.ingredientsService.create(body);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() body: IngredientUpdateDTO) {
    return await this.ingredientsService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.ingredientsService.delete(id);
  }

  @Delete()
  @Roles(Role.ADMIN)
  async deleteAll() {
    return await this.ingredientsService.deleteAll();
  }
}
