import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { RecipeEntity } from 'src/models/recipes/entities/recipes.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients-details')
export class IngredientsDetailEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ingredientName: string;

  @Column()
  quantity: string;

  @Column()
  recipeId: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredientsDetails)
  recipe: RecipeEntity;
}
