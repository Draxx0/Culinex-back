import { Controller } from '@nestjs/common';
import { RecipesCommentService } from './recipes-comment.service';

@Controller('recipes-comment')
export class RecipesCommentController {
  constructor(private readonly recipesCommentService: RecipesCommentService) {}
}
