import { Role } from 'src/decorator/role.decorator';
import { RecipeEntity } from 'src/models/recipes/entities/recipes.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
    eager: true,
  })
  recipes: RecipeEntity[];
}
