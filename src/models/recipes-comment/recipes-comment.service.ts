import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesCommentEntity } from './entities/recipes-comment.entity';
import { Repository } from 'typeorm';
import { RecipesCommentCreateDTO } from './dto/recipes-comment.create.dto';

@Injectable()
export class RecipesCommentService {
  constructor(
    @InjectRepository(RecipesCommentEntity)
    private readonly recipeCommentRepository: Repository<RecipesCommentEntity>,
  ) {}

  async create(id: string, body: RecipesCommentCreateDTO) {
    const newComment = await this.recipeCommentRepository.create({
      ...body,
      recipeId: id,
    });

    await this.recipeCommentRepository.save(newComment);
  }
}
