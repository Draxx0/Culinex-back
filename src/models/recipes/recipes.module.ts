import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipes.entity';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      IngredientEntity,
      IngredientsDetailEntity,
    ]),
    UsersModule,
    PaginationModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
