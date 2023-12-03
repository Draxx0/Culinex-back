import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('ingredient-category')
export class IngredientCategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => IngredientCategoryEntity, (category) => category.ingredients)
  ingredients: IngredientCategoryEntity[];
}
