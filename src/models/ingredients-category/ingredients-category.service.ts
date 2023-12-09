import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientCategoryEntity } from './entities/ingredients-category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/ingredients-category.create.dto';
import { IngredientsCategoryQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination/pagination.service';

@Injectable()
export class IngredientsCategoryService {
  constructor(
    @InjectRepository(IngredientCategoryEntity)
    private readonly ingredientCategoryRepository: Repository<IngredientCategoryEntity>,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: IngredientsCategoryQueries) {
    const { per_page = 10, page = 1 } = queries;

    const query =
      this.ingredientCategoryRepository.createQueryBuilder(
        'ingredientCategory',
      );

    const [categories, total] = await query
      .orderBy('ingredientCategory.name')
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    return await this.paginationService.paginate(
      page,
      per_page,
      total,
      categories,
    );
  }

  async findOneByName(name: string) {
    return await this.ingredientCategoryRepository.findOneBy({ name });
  }

  async create(body: CreateCategoryDTO) {
    const category = this.ingredientCategoryRepository.create(body);

    return await this.ingredientCategoryRepository.save(category);
  }

  async delete(id: string) {
    return await this.ingredientCategoryRepository.softDelete(id);
  }

  async deleteAll() {
    const categories = await this.ingredientCategoryRepository.find();

    return await this.ingredientCategoryRepository.softRemove(categories);
  }
}
