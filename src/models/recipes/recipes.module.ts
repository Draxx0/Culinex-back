import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipes.entity';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { UsersModule } from '../users/users.module';
import { RecipesController } from './recipes.controller';
import { RecipesCommentModule } from '../recipes-comment/recipes-comment.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      IngredientEntity,
      IngredientsDetailEntity,
    ]),
    PaginationModule,
    UsersModule,
    RecipesCommentModule,
    HttpModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
