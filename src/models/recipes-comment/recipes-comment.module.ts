import { Module } from '@nestjs/common';
import { RecipesCommentService } from './recipes-comment.service';
import { RecipesCommentController } from './recipes-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesCommentEntity } from './entities/recipes-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipesCommentEntity])],
  controllers: [RecipesCommentController],
  providers: [RecipesCommentService],
  exports: [RecipesCommentService],
})
export class RecipesCommentModule {}
