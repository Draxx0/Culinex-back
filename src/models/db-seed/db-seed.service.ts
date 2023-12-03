import { Inject, Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { ingredientsSeed } from './data/ingredients.seed';
import { IngredientsCategoryService } from '../ingredients-category/ingredients-category.service';
import { categoriesSeed } from './data/categories.seed';

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
    let generatedCount = 0;
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
          console.log(
            'category not found, creating for ingredient',
            ingredient,
          );
          const newCategory = await this.ingredientsCategoryService.create({
            name: ingredient.categoryName,
          });

          await this.ingredientsService.create({
            ...ingredient,
            categoryId: newCategory.id,
          });

          generatedCount++;

          continue;
        }

        if (
          ingredientExists &&
          ingredientExists.categoryId === IngredientCategoryExists.id
        ) {
          console.log('ingredientExists & category already exist');
          continue;
        }

        console.log(
          'about to create ingredient',
          ingredient,
          'with existing category',
          IngredientCategoryExists,
        );
        await this.ingredientsService.create({
          ...ingredient,
          categoryId: IngredientCategoryExists.id,
        });
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
    return 'generateRecipes';
  }
}
