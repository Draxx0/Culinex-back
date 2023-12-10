import { Inject, Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { ingredientsSeed } from './data/ingredients.seed';
import { IngredientsCategoryService } from '../ingredients-category/ingredients-category.service';
import { categoriesSeed } from './data/categories.seed';
import { recipesSeed } from './data/recipes.seed';

@Injectable()
export class DbSeedService {
  constructor(
    @Inject(IngredientsService)
    private readonly ingredientsService: IngredientsService,
    @Inject(RecipesService)
    private readonly recipesService: RecipesService,
    @Inject(IngredientsCategoryService)
    private readonly ingredientsCategoryService: IngredientsCategoryService,
  ) {}

  async generateIngredients() {
    let ingredientsGeneratedCount = 0;
    let categoriesGeneratedCount = 0;
    let status: string;
    for (const ingredient of ingredientsSeed) {
      try {
        const ingredientExists = await this.ingredientsService.findOneByName(
          ingredient.name,
        );

        const IngredientCategoryExists =
          await this.ingredientsCategoryService.findOneByName(
            ingredient.categoryName,
          );

        if (!IngredientCategoryExists) {
          const newCategory = await this.ingredientsCategoryService.create({
            name: ingredient.categoryName,
          });

          categoriesGeneratedCount++;

          await this.ingredientsService.create({
            ...ingredient,
            categoryId: newCategory.id,
          });

          ingredientsGeneratedCount++;

          continue;
        }

        if (
          ingredientExists &&
          ingredientExists.categoryId === IngredientCategoryExists.id
        ) {
          continue;
        }
        await this.ingredientsService.create({
          ...ingredient,
          categoryId: IngredientCategoryExists.id,
        });
        ingredientsGeneratedCount++;
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
      totalGenerated: {
        ingredients: ingredientsGeneratedCount,
        categories: categoriesGeneratedCount,
      },
    };
  }

  async generateIngredientsCategory() {
    for (const category of categoriesSeed) {
      try {
        const categoryExists =
          await this.ingredientsCategoryService.findOneByName(category.name);
        if (categoryExists) {
          continue;
        }
        await this.ingredientsCategoryService.create(category);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  async generateRecipes() {
    let generatedCount = 0;
    let status: string;
    for (const recipe of recipesSeed) {
      try {
        const recipeExists = await this.recipesService.findOneByTitle(
          recipe.title,
        );
        console.log('recipeExists', recipeExists);
        if (recipeExists) {
          continue;
        }
        await this.recipesService.create(recipe);
        generatedCount++;
      } catch (error) {
        status = 'error';
        throw new Error(error);
      }
    }

    status = 'success';

    return {
      status,
      message: status === 'success' ? 'Recipes generated' : 'Error occurred',
      totalGenerated: generatedCount,
    };
  }
}
