import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { RecipeDifficulty, RecipeType } from '../types/recipes';

export class RecipeUpdateDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Apéritif', 'Entrée', 'Plat', 'Dessert', 'Boisson', 'Autre'])
  type?: RecipeType;

  @IsOptional()
  @IsString()
  @IsIn(['Facile', 'Moyen', 'Difficile'])
  difficulty?: RecipeDifficulty;

  @IsOptional()
  @IsArray()
  instructions?: string[];

  @IsOptional()
  @IsArray()
  details?: {
    ingredientName?: string;
    quantity?: string;
  }[];
}
