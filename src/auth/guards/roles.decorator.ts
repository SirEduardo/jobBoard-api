import { SetMetadata } from "@nestjs/common";

// Crea un nuevo decorador para los controles llamado Role que se usara como middleware 
// para asegurar en este caso que roles pueden acceder a a cada ruta

export const Roles = ( ...roles:  string[]) => SetMetadata('roles', roles)