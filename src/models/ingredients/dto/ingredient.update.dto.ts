import { IsOptional, IsString } from 'class-validator';

export class IngredientUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
