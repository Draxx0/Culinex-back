import { Controller, Get } from '@nestjs/common';
import { DbSeedService } from './db-seed.service';

@Controller('seed')
export class DbSeedController {
  constructor(private readonly dbSeedService: DbSeedService) {}

  @Get('generate-ingredients')
  async generateIngredients() {
    return await this.dbSeedService.generateIngredients();
  }

  @Get('generate-ingredients-category')
  async generateIngredientsCategory() {
    return await this.dbSeedService.generateIngredientsCategory();
  }

  @Get('generate-recipes')
  async generateRecipes() {
    return await this.dbSeedService.generateRecipes();
  }
}
