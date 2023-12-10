import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { IngredientUnit } from '../types/ingredients';

export class IngredientUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsIn(['grammes', 'litres', 'cl', 'c. à soupe', 'c. à café', 'unité'])
  unit?: IngredientUnit[];
}
