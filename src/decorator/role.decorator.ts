import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'user',
  CONTRIBUTOR = 'contributor',
  ADMIN = 'admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (role: Role[]) => SetMetadata(ROLES_KEY, role);
