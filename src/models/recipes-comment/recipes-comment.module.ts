import { Module } from '@nestjs/common';
import { RecipesCommentService } from './recipes-comment.service';
import { RecipesCommentController } from './recipes-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesCommentEntity } from './entities/recipes-comment.entity';
import { RecipesModule } from '../recipes/recipes.module';
import { RecipeEntity } from '../recipes/entities/recipes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipesCommentEntity, RecipeEntity]),
    RecipesModule,
  ],
  controllers: [RecipesCommentController],
  providers: [RecipesCommentService],
  exports: [RecipesCommentService],
})
export class RecipesCommentModule {}
