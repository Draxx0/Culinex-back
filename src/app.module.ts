import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './models/recipes/recipes.module';
import { IngredientsModule } from './models/ingredients/ingredients.module';
import { PaginationModule } from './models/common/models/pagination/pagination.module';
import { IngredientsDetailsModule } from './models/ingredient-details/ingredients-details.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostgresModule } from './database/postgres.module';
import { IngredientsCategoryModule } from './models/ingredients-category/ingredients-category.module';
// import { RedisModule } from './cache/redis/redis.module';

@Module({
  imports: [
    PostgresModule,
    RecipesModule,
    IngredientsModule,
    IngredientsDetailsModule,
    IngredientsCategoryModule,
    PaginationModule,
    AuthenticationModule,
    // RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
