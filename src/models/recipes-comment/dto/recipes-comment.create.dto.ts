import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RecipeCommentNote } from '../types/recipes-comment';

export class RecipesCommentCreateDTO {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  note: RecipeCommentNote;
}
