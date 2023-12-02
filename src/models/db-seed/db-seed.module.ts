import { Module } from '@nestjs/common';
import { DbSeedService } from './db-seed.service';
import { DbSeedController } from './db-seed.controller';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [IngredientsModule, RecipesModule],
  controllers: [DbSeedController],
  providers: [DbSeedService],
})
export class DbSeedModule {}
