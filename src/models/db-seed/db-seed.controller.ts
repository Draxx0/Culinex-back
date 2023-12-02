import { Controller, Get } from '@nestjs/common';
import { DbSeedService } from './db-seed.service';

@Controller('seed')
export class DbSeedController {
  constructor(private readonly dbSeedService: DbSeedService) {}

  @Get('generate-ingredients')
  async generateIngredients() {
    return await this.dbSeedService.generateIngredients();
  }

  @Get('generate-recipes')
  async generateRecipes() {
    return await this.dbSeedService.generateRecipes();
  }
}
