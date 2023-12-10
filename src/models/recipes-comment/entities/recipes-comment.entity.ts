import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeCommentNote } from '../types/recipes-comment';
import { RecipeEntity } from 'src/models/recipes/entities/recipes.entity';

@Entity('recipes-comment')
export class RecipesCommentEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({
    type: 'int',
    enum: [1, 2, 3, 4, 5],
  })
  note: RecipeCommentNote;

  @Column()
  recipeId: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.comments)
  recipe: RecipeEntity;
}
