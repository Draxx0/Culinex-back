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
import { DbSeedModule } from './models/db-seed/db-seed.module';
import { RecipesCommentModule } from './models/recipes-comment/recipes-comment.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
// import { RedisModule } from './cache/redis/redis.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PostgresModule,
    RecipesModule,
    IngredientsModule,
    IngredientsDetailsModule,
    IngredientsCategoryModule,
    PaginationModule,
    AuthenticationModule,
    RecipesCommentModule,
    process.env.NODE_ENV === 'development' && DbSeedModule,
    // RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
