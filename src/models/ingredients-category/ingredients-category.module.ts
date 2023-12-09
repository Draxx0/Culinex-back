import { Module } from '@nestjs/common';
import { IngredientsCategoryService } from './ingredients-category.service';
import { IngredientsCategoryController } from './ingredients-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientCategoryEntity } from './entities/ingredients-category.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientCategoryEntity]),
    PaginationModule,
  ],
  controllers: [IngredientsCategoryController],
  providers: [IngredientsCategoryService],
  exports: [IngredientsCategoryService],
})
export class IngredientsCategoryModule {}
