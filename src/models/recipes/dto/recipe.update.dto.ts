import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class RecipeUpdateDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsArray()
  details?: {
    ingredientName?: string;
    quantity?: string;
  }[];
}
