import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { RecipeEntity } from 'src/models/recipes/entities/recipes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IngredientCategoryEntity } from 'src/models/ingredients-category/entities/ingredients-category.entity';
import { IngredientUnit, IngredientUnitEnum } from '../types/ingredients';

@Entity('ingredient')
export class IngredientEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @Column('enum', {
    enum: IngredientUnitEnum,
    array: true,
    default: [],
  })
  unit: IngredientUnit[];

  @ManyToMany(() => RecipeEntity, (recipe) => recipe.ingredients)
  recipes: RecipeEntity[];

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(
    () => IngredientCategoryEntity,
    (category) => category.ingredients,
    {
      onDelete: 'SET NULL',
    },
  )
  category: IngredientCategoryEntity;
}
