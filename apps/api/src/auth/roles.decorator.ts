import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<'STUDENT' | 'COORDINATOR' | 'ADMIN'>): ReturnType<typeof SetMetadata> => SetMetadata(ROLES_KEY, roles);
