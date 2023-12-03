import { IsNotEmpty, IsString } from 'class-validator';

export class IngredientCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
