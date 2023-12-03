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
import { RecipeType } from '../types/recipes';

@Entity('recipe')
export class RecipeEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'text',
    enum: ['Facile', 'Moyen', 'Difficile'],
  })
  difficulty: 'Facile' | 'Moyen' | 'Difficile';

  @Column({
    type: 'text',
    enum: ['Apéritif', 'Entrée', 'Plat', 'Dessert', 'Boisson', 'Autre'],
  })
  type: RecipeType;

  @Column({
    type: 'text',
    array: true,
  })
  instructions: string[];

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
