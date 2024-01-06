import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipesCommentService } from './recipes-comment.service';
import { RecipesCommentCreateDTO } from './dto/recipes-comment.create.dto';

@Controller('recipes-comment')
export class RecipesCommentController {
  constructor(private readonly recipesCommentService: RecipesCommentService) {}

  @Post(':id')
  async create(@Param('id') id: string, @Body() body: RecipesCommentCreateDTO) {
    return await this.recipesCommentService.create(id, body);
  }

  @Delete()
  async delete() {
    return await this.recipesCommentService.deleteAll();
  }
}
