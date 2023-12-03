export interface Recipe {
  title: string;
  description: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  type: RecipeType;
  ingredients: string[];
  instructions: string[];
  details: RecipeDetails[];
}

export interface RecipeDetails {
  ingredientName: string;
  quantity: string;
}

export type RecipeDifficulty = 'Facile' | 'Moyen' | 'Difficile';

export type RecipeType =
  | 'Apéritif'
  | 'Entrée'
  | 'Plat'
  | 'Dessert'
  | 'Boisson'
  | 'Autre';
