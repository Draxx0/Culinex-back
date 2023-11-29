import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { IngredientsDetailEntity } from 'src/models/ingredient-details/entities/ingredients-details.entity';
import { IngredientEntity } from 'src/models/ingredients/entities/ingredients.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('recipe-entity')
export class RecipeEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  difficulty: string;

  @Column({ nullable: true })
  instructions: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => IngredientEntity, (ingredient) => ingredient.recipes, {
    eager: true,
  })
  @JoinTable()
  ingredients: IngredientEntity[];

  @OneToMany(
    () => IngredientsDetailEntity,
    (ingredientDetails) => ingredientDetails.recipe,
    {
      cascade: true,
      eager: true,
    },
  )
  ingredientsDetails: IngredientsDetailEntity[];
}
