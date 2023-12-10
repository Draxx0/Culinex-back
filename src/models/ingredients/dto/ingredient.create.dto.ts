import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { IngredientUnit } from '../types/ingredients';

export class IngredientCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @IsNotEmpty()
  @IsIn(['grammes', 'litres', 'cl', 'c. à soupe', 'c. à café', 'unité'])
  unit: IngredientUnit[];
}
