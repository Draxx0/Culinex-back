import { SetMetadata } from '@nestjs/common';

export enum AuthorBy {
  USER_ID = 'userId',
  RECIPE = 'recipe',
}

export const AUTHOR_BY_KEY = 'authorBy';

export const Author = (authorBy: AuthorBy) =>
  SetMetadata(AUTHOR_BY_KEY, authorBy);
