import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipes.entity';
import { In, Repository } from 'typeorm';
import { RecipeCreateDTO } from './dto/recipe.create.dto';
import { RecipeUpdateDTO } from './dto/recipe.update.dto';
import { IngredientEntity } from '../ingredients/entities/ingredients.entity';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { RecipesQueries } from './queries/queries';
import { IngredientsDetailEntity } from '../ingredient-details/entities/ingredients-details.entity';
import { GetRecipesDTO } from './dto/recipe.get.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(IngredientsDetailEntity)
    private readonly ingredientsDetailsRepository: Repository<IngredientsDetailEntity>,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: RecipesQueries) {
    const { per_page = 10, page = 1 } = queries;

    const query = this.recipeRepository.createQueryBuilder('recipe');

    const [recipes, total] = await query
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.ingredientsDetails', 'ingredientsDetails')
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
    const { per_page = 10, page = 1 } = queries;
    const { ingredients } = body;

    const query = this.recipeRepository.createQueryBuilder('recipe');

    const [recipes, total] = await query
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.ingredientsDetails', 'ingredientsDetails')
      .where((qb) => {
        qb.where('ingredient.name IN (:...ingredients)', {
          ingredients: ingredients.map((ingredient) => ingredient.name),
        })
          .andWhere(
            `(
            SELECT COUNT(*)
            FROM ingredientsDetails id
            WHERE id.recipeId = recipe.id
            AND id.ingredientName IN (:...ingredientNames)
          ) = :ingredientCount`,
            {
              ingredientNames: ingredients.map((ingredient) => ingredient.name),
              ingredientCount: ingredients.length,
            },
          )
          .andWhere(
            `(
            SELECT COUNT(*)
            FROM ingredientsDetails id
            WHERE id.recipeId = recipe.id
            AND id.ingredientName IN (:...ingredientNames)
            AND id.quantity >= :quantity
          ) = :ingredientCount`,
            {
              ingredientNames: ingredients.map((ingredient) => ingredient.name),
              ingredientCount: ingredients.length,
              quantity: body.ingredients[0].quantity,
            },
          );
      })
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

  async findOne(id: string) {
    return await this.recipeRepository.findOneOrFail({
      where: { id },
      relations: ['ingredients'],
    });
  }

  async create(body: RecipeCreateDTO) {
    const { title, difficulty, ingredients, details } = body;

    const recipe = this.recipeRepository.create({
      title,
      difficulty,
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

      console.log(ingredientName, quantity);

      console.log(ingredientsEntities);

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

  async delete(id: string) {
    return await this.recipeRepository.softDelete(id);
  }

  async deleteAll() {
    const recipes = await this.recipeRepository.find();
    return await this.recipeRepository.softRemove(recipes);
  }
}
