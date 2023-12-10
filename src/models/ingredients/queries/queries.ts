import { PaginateQueries } from 'src/models/common/queries/queries';

export class IngredientQueries extends PaginateQueries {
  search?: string;
  sort_by?: 'createdAt' | 'name' | 'updatedAt';
  sort_order?: 'ASC' | 'DESC';
}
