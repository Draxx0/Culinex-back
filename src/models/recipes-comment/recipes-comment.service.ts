import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesCommentEntity } from './entities/recipes-comment.entity';
import { Repository } from 'typeorm';
import { RecipesCommentCreateDTO } from './dto/recipes-comment.create.dto';
import { RecipesService } from '../recipes/recipes.service';
import { ApiCommonResponse } from 'src/common/types';

@Injectable()
export class RecipesCommentService {
  constructor(
    @InjectRepository(RecipesCommentEntity)
    private readonly recipeCommentRepository: Repository<RecipesCommentEntity>,
    @Inject(RecipesService)
    private readonly recipeService: RecipesService,
  ) {}

  async create(
    recipeId: string,
    body: RecipesCommentCreateDTO,
  ): Promise<ApiCommonResponse<RecipesCommentEntity>> {
    const recipe = await this.recipeService.findOne(recipeId);

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const newComment = await this.recipeCommentRepository.create({
      ...body,
      recipe,
    });

    console.log(newComment);

    await this.recipeCommentRepository.save(newComment);

    await this.recipeService.updateGlobalNote(recipeId);

    return {
      status: 201,
      message: 'Comment created',
      data: newComment,
    };
  }

  async deleteAll() {
    return await this.recipeCommentRepository.delete({});
  }
}
