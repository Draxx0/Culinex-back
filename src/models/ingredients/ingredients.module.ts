import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './entities/ingredients.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity]), PaginationModule],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
