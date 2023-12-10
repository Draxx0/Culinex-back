import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RecipesService } from 'src/models/recipes/recipes.service';
import { AUTHOR_BY_KEY } from 'src/decorator/author.decorator';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly recipeService: RecipesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorBy = this.reflector.get<string>(
      AUTHOR_BY_KEY,
      context.getHandler(),
    );

    console.log('authorBy', authorBy);

    if (!authorBy) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    const idInParams = context.switchToHttp().getRequest().params.id;

    if (!user) {
      return false;
    }

    if (authorBy === 'userId' && idInParams) {
      return user.id === idInParams;
    }

    if (authorBy === 'recipe' && idInParams) {
      console.log('recipe');
      try {
        const recipe = await this.recipeService.findOne(idInParams);

        if (recipe && recipe.userId) {
          return user.id === recipe.userId;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}
