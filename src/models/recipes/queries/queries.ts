import { PaginateQueries } from 'src/models/common/queries/queries';

export class RecipesQueries extends PaginateQueries {
  search?: string;
  sort_by?: 'created_at' | 'title' | 'updated_at';
  sort_order?: 'ASC' | 'DESC';
}
