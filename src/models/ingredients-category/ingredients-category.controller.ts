import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IngredientsCategoryService } from './ingredients-category.service';
import { CreateCategoryDTO } from './dto/ingredients-category.create.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role, Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('ingredients-category')
@UseGuards(AuthGuard, RolesGuard)
export class IngredientsCategoryController {
  constructor(
    private readonly ingredientsCategoryService: IngredientsCategoryService,
  ) {}

  @Get()
  async findAll() {
    return await this.ingredientsCategoryService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() body: CreateCategoryDTO) {
    return await this.ingredientsCategoryService.create(body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.ingredientsCategoryService.delete(id);
  }

  @Delete()
  @Roles(Role.ADMIN)
  async deleteAll() {
    return await this.ingredientsCategoryService.deleteAll();
  }
}
