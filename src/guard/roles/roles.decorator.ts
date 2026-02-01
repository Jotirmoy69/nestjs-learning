import { SetMetadata } from "@nestjs/common";

export const ROLEs_KEY = 'roles'; 

export  const RolesFromDecor = (...roles: string[]) => SetMetadata(ROLEs_KEY, roles);

