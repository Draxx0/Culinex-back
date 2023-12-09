import { PaginateQueries } from 'src/models/common/queries/queries';

export class IngredientQueries extends PaginateQueries {
  search?: string;
  sort_by?: 'created_at' | 'name' | 'updated_at';
  sort_order?: 'ASC' | 'DESC';
}
