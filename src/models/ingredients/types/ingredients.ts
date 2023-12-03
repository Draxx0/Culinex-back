import { IngredientCategory } from 'src/models/ingredients-category/types/ingredients-category';

export interface Ingredient {
  name: string;
  categoryName: IngredientCategory;
}
