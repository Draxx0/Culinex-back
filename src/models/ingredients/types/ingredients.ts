import { IngredientCategory } from 'src/models/ingredients-category/types/ingredients-category';

export interface Ingredient {
  name: string;
  categoryName: IngredientCategory;
  unit: IngredientUnit[];
}

export type IngredientUnit =
  | 'grammes'
  | 'pincée'
  | 'gousse'
  | 'litres'
  | 'cl'
  | 'c. à soupe'
  | 'c. à café'
  | 'unité';

export enum IngredientUnitEnum {
  'grammes' = 'grammes',
  'pincée' = 'pincée',
  'gousse' = 'gousse',
  'litres' = 'litres',
  'cl' = 'cl',
  'c. à soupe' = 'c. à soupe',
  'c. à café' = 'c. à café',
  'unité' = 'unité',
}
