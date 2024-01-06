import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.comments, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
