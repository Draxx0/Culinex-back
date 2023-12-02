import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { RecipeEntity } from 'src/models/recipes/entities/recipes.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToMany(() => RecipeEntity, (recipe) => recipe.ingredients)
  recipes: RecipeEntity[];
}
