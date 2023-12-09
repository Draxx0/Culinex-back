import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => RecipesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthenticationService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
