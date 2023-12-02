import { IsArray, IsNotEmpty } from 'class-validator';

export class GetRecipesDTO {
  @IsArray()
  @IsNotEmpty()
  ingredients: string[];
}
