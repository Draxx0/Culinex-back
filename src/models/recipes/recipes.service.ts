import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { UsersService } from '../users/users.service';
import { RecipeCreateDTO } from './dto/recipe.create.dto';
import { GetRecipesDTO } from './dto/recipe.get.dto';
import { RecipeUpdateDTO } from './dto/recipe.update.dto';
import { RecipeEntity } from './entities/recipes.entity';
import { RecipesQueries } from './queries/queries';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(IngredientsDetailEntity)
    private readonly ingredientsDetailsRepository: Repository<IngredientsDetailEntity>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: RecipesQueries) {
    const {
      per_page = 10,
      page = 1,
      search,
      sort_by = 'createdAt',
      sort_order = 'DESC',
    } = queries;

    const query = this.recipeRepository.createQueryBuilder('recipe');

    if (search) {
      query.where(
        'recipe.title ILIKE :search OR recipe.description ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [recipes, total] = await query
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.ingredientsDetails', 'ingredientsDetails')
      .leftJoinAndSelect('recipe.comments', 'comments')
      .orderBy(`recipe.${sort_by}`, sort_order)
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    return await this.paginationService.paginate(
      page,
      per_page,
      total,
      recipes,
    );
  }

  async findRecipesByIngredients(body: GetRecipesDTO, queries: RecipesQueries) {
    const {
      per_page = 10,
      page = 1,
      sort_by = 'createdAt',
      sort_order = 'DESC',
    } = queries;
    const { ingredients } = body;

    const query = this.recipeRepository.createQueryBuilder('recipe');

    const [recipes, total] = await query
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.ingredientsDetails', 'ingredientsDetails')
      .where('ingredient.name IN (:...ingredientNames)', {
        ingredientNames: ingredients,
      })
      .andWhere(
        'NOT EXISTS (SELECT 1 FROM "ingredients-details" i WHERE i."recipeId" = recipe."id" AND i."ingredientName" NOT IN (:...ingredientNames))',
        {
          ingredientNames: ingredients,
        },
      )
      .orderBy(`recipe.${sort_by}`, sort_order)
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    return await this.paginationService.paginate(
      page,
      per_page,
      total,
      recipes,
    );
  }

  async findOneByTitle(title: string) {
    return await this.recipeRepository.findOne({
      where: { title },
      relations: ['ingredients', 'ingredientsDetails'],
    });
  }

  async findOne(id: string) {
    return await this.recipeRepository.findOneOrFail({
      where: { id },
      relations: ['ingredients'],
    });
  }

  async create(body: RecipeCreateDTO) {
    const {
      title,
      difficulty,
      ingredients,
      details,
      instructions,
      description,
      cost,
      time,
      type,
    } = body;

    const user = await this.usersService.findOne(body.userId);

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas.");
    }

    const totalPreparationTime =
      time.preparation + time.cooking + (time.rest || 0);

    const recipe = this.recipeRepository.create({
      title,
      difficulty,
      description,
      type,
      instructions,
      cost,
      time: {
        ...time,
        total: totalPreparationTime,
      },
      userId: user.id,
      user,
    });

    const ingredientsEntities = await this.ingredientRepository.find({
      where: { name: In(ingredients) },
    });

    if (ingredientsEntities.length !== ingredients.length) {
      throw new NotFoundException("Certains ingrédients n'existent pas.");
    }

    recipe.ingredients = ingredientsEntities;

    const ingredientDetails = details.map((detail) => {
      const { ingredientName, quantity } = detail;

      const ingredient = ingredientsEntities.find(
        (ingredient) =>
          ingredient.name.toLowerCase() === ingredientName.toLowerCase(),
      );

      if (!ingredient) {
        throw new NotFoundException(
          `Ingrédient "${ingredientName}" non trouvé.`,
        );
      }

      const ingredientDetails = this.ingredientsDetailsRepository.create({
        ingredientName,
        quantity,
        recipeId: recipe.id,
      });

      return ingredientDetails;
    });

    recipe.ingredientsDetails = ingredientDetails;

    return await this.recipeRepository.save(recipe);
  }

  async update(id: string, body: RecipeUpdateDTO) {
    const ingredient = await this.recipeRepository.findOneBy({ id });

    return await this.recipeRepository.save({
      ...ingredient,
      ...body,
    });
  }

  async updateGlobalNote(id: string) {
    const recipe = await this.findOne(id);

    const comments = recipe.comments;

    const globalNote =
      comments.reduce((acc, comment) => acc + comment.note, 0) /
      comments.length;

    return await this.recipeRepository.update(id, {
      global_note: globalNote,
    });
  }

  async delete(id: string) {
    return await this.recipeRepository.softDelete(id);
  }

  async deleteAll() {
    const recipes = await this.recipeRepository.find();
    return await this.recipeRepository.softRemove(recipes);
  }
}
