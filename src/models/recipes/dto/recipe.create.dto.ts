import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class RecipeCreateDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @IsArray()
  @IsNotEmpty()
  ingredients: string[];

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsArray()
  @IsNotEmpty()
  details: {
    ingredientName: string;
    quantity: string;
  }[];
}
