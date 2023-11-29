import { IsArray, IsNotEmpty } from 'class-validator';

export class GetRecipesDTO {
  @IsArray()
  @IsNotEmpty()
  ingredients: IGetRecipes['ingredients'];
}

interface IGetRecipes {
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
}
