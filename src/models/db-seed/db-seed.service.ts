import { Inject, Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { ingredientsSeed } from './data/ingredients.seed';

@Injectable()
export class DbSeedService {
  constructor(
    @Inject(IngredientsService)
    private readonly ingredientsService: IngredientsService,
    @Inject(RecipesService)
    private readonly recipesService: RecipesService,
  ) {}

  async generateIngredients() {
    let generatedCount = 0;
    let status: string;
    for (const ingredient of ingredientsSeed) {
      try {
        const ingredientExists = await this.ingredientsService.findOneByName(
          ingredient.name,
        );
        if (ingredientExists) {
          continue;
        }
        await this.ingredientsService.create(ingredient);
        generatedCount++;
      } catch (error) {
        status = 'error';
        throw new Error(error);
      }
    }
    status = 'success';
    return {
      status,
      message:
        status === 'success' ? 'Ingredients generated' : 'Error occurred',
      totalGenerated: generatedCount,
    };
  }

  async generateRecipes() {
    return 'generateRecipes';
  }
}
