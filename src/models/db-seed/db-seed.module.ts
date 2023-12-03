import { Module } from '@nestjs/common';
import { DbSeedService } from './db-seed.service';
import { DbSeedController } from './db-seed.controller';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { RecipesModule } from '../recipes/recipes.module';
import { IngredientsCategoryModule } from '../ingredients-category/ingredients-category.module';

@Module({
  imports: [IngredientsModule, RecipesModule, IngredientsCategoryModule],
  controllers: [DbSeedController],
  providers: [DbSeedService],
})
export class DbSeedModule {}
