import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { IngredientCategory } from '../types/ingredient';

export class IngredientCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn([
    IngredientCategory.MEAT,
    IngredientCategory.FISH,
    IngredientCategory.VEGETABLE,
    IngredientCategory.FRUIT,
    IngredientCategory.DAIRY,
    IngredientCategory.CEREAL,
    IngredientCategory.LEGUME,
    IngredientCategory.NUT,
    IngredientCategory.MUSHROOM,
    IngredientCategory.SPICE,
    IngredientCategory.OIL,
    IngredientCategory.SUGAR,
    IngredientCategory.SAUCE,
    IngredientCategory.ALCOHOL,
    IngredientCategory.OTHER,
  ])
  @IsNotEmpty()
  category: string;
}
