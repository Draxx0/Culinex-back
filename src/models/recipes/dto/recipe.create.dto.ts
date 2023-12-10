import { IsArray, IsIn, IsNotEmpty, IsObject, IsString } from 'class-validator';
import {
  RecipeCost,
  RecipeDifficulty,
  RecipeTime,
  RecipeType,
} from '../types/recipes';

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

  @IsObject()
  @IsNotEmpty()
  time: Omit<RecipeTime, 'total'>;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Abordable', 'Modéré', 'Gourmet'])
  cost: RecipeCost;

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
