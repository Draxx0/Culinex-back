import { Module } from '@nestjs/common';
import { IngredientsDetailsService } from './ingredients-details.service';
import { IngredientsDetailsController } from './ingredients-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsDetailEntity } from './entities/ingredients-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsDetailEntity])],
  controllers: [IngredientsDetailsController],
  providers: [IngredientsDetailsService],
})
export class IngredientsDetailsModule {}
