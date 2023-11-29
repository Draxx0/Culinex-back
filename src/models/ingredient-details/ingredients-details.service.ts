import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientsDetailEntity } from './entities/ingredients-details.entity';

@Injectable()
export class IngredientsDetailsService {
  constructor(
    @InjectRepository(IngredientsDetailEntity)
    private readonly ingredientsDetailsRepository: Repository<IngredientsDetailEntity>,
  ) {}

  async findAll() {
    return await this.ingredientsDetailsRepository.find();
  }

  async delete(id: string) {
    return await this.ingredientsDetailsRepository.softDelete(id);
  }

  async deleteAll() {
    const recipes = await this.ingredientsDetailsRepository.find();
    return await this.ingredientsDetailsRepository.softRemove(recipes);
  }
}
