import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './entities/ingredients.entity';
import { Repository } from 'typeorm';
import { IngredientCreateDTO } from './dto/ingredient.create.dto';
import { IngredientUpdateDTO } from './dto/ingredient.update.dto';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { IngredientQueries } from './queries/queries';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: IngredientQueries) {
    const {
      per_page = 10,
      page = 1,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;
    const query = this.ingredientRepository.createQueryBuilder('ingredient');

    if (search) {
      query.where('ingredient.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [ingredients, total] = await query
      .leftJoinAndSelect('ingredient.recipes', 'recipe')
      .skip((page - 1) * per_page)
      .orderBy(`ingredient.${sort_by}`, sort_order)
      .take(per_page)
      .getManyAndCount();

    return await this.paginationService.paginate(
      page,
      per_page,
      total,
      ingredients,
    );
  }

  async findOne(id: string) {
    return await this.ingredientRepository.findOne({
      relations: {
        recipes: true,
      },
      where: { id },
    });
  }

  async findOneByName(name: string) {
    return await this.ingredientRepository.findOne({
      relations: {
        recipes: true,
      },
      where: { name },
    });
  }

  async create(body: IngredientCreateDTO) {
    const { name: ingredientName } = body;

    const ingredientExists = await this.ingredientRepository.findOne({
      where: { name: ingredientName },
    });

    if (ingredientExists) {
      throw new Error('Ingredient already exists');
    }

    const ingredient = this.ingredientRepository.create(body);

    return await this.ingredientRepository.save(ingredient);
  }

  async update(id: string, body: IngredientUpdateDTO) {
    const ingredient = await this.ingredientRepository.findOne({
      relations: {
        recipes: true,
      },
      where: { id },
    });

    return await this.ingredientRepository.save({
      ...ingredient,
      ...body,
    });
  }

  async delete(id: string) {
    const ingredient = await this.ingredientRepository.findOne({
      relations: {
        recipes: true,
      },
      where: { id },
    });
    return await this.ingredientRepository.softRemove(ingredient);
  }

  async deleteAll() {
    const ingredients = await this.ingredientRepository.find({
      relations: {
        recipes: true,
      },
    });
    return await this.ingredientRepository.softRemove(ingredients);
  }
}
