import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

/*
El RolesGuard es una clase que implementa la interfaz CanActivate de NestJS. Su propósito es proteger rutas o controladores verificando si el usuario autenticado tiene el rol necesario para acceder al recurso solicitado. Utiliza metadatos definidos mediante decoradores personalizados (@SetMetadata('roles', [...])) para determinar los roles permitidos.
*/


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) return true

        const { user } = context.switchToHttp().getRequest()
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException("You do not have permissions (roles)")
        }
        return true
    }
}