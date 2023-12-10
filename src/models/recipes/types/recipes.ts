export interface Recipe {
  title: string;
  description: string;
  difficulty: RecipeDifficulty;
  cost: RecipeCost;
  time: Omit<RecipeTime, 'total'>;
  global_note: number;
  type: RecipeType;
  ingredients: string[];
  instructions: string[];
  details: RecipeDetails[];
}

export interface RecipeDetails {
  ingredientName: string;
  quantity: string;
}

export interface RecipeTime {
  preparation: number;
  cooking: number;
  rest: number | null;
  total: number;
}

export type RecipeDifficulty = 'Facile' | 'Moyen' | 'Difficile';

export type RecipeCost = 'Abordable' | 'Modéré' | 'Gourmet';

export type RecipeType =
  | 'Apéritif'
  | 'Entrée'
  | 'Plat'
  | 'Dessert'
  | 'Boisson'
  | 'Autre';
