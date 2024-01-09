import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DbSeedService } from './db-seed.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('seed')
@UseGuards(AuthGuard)
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
  async generateRecipes(@Request() req) {
    return await this.dbSeedService.generateRecipes(req.user.id);
  }
}
