import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientCategoryEntity } from './entities/ingredients-category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/ingredients-category.create.dto';

@Injectable()
export class IngredientsCategoryService {
  constructor(
    @InjectRepository(IngredientCategoryEntity)
    private readonly ingredientCategoryRepository: Repository<IngredientCategoryEntity>,
  ) {}

  async findAll() {
    return await this.ingredientCategoryRepository.find();
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
