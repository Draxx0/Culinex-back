import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { RecipeDifficulty, RecipeType } from '../types/recipes';

export class RecipeCreateDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Apéritif', 'Entrée', 'Plat', 'Dessert', 'Boisson', 'Autre'])
  type: RecipeType;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Facile', 'Moyen', 'Difficile'])
  difficulty: RecipeDifficulty;

  @IsArray()
  @IsNotEmpty()
  ingredients: string[];

  @IsArray()
  @IsNotEmpty()
  instructions: string[];

  @IsArray()
  @IsNotEmpty()
  details: {
    ingredientName: string;
    quantity: string;
  }[];
}
