import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './types/recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipes.entity';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      IngredientEntity,
      IngredientsDetailEntity,
    ]),
    PaginationModule,
    UsersModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
