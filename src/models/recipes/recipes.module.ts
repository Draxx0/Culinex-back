import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipes.entity';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      IngredientEntity,
      IngredientsDetailEntity,
    ]),
    PaginationModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
