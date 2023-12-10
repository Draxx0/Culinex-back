import { PaginateQueries } from 'src/models/common/queries/queries';

export class RecipesQueries extends PaginateQueries {
  search?: string;
  sort_by?: 'createdAt' | 'title' | 'updatedAt';
  sort_order?: 'ASC' | 'DESC';
}
