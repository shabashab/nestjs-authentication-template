import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/entities/user.entity";
import { PERMISSIONS_METADATA_KEY } from "./authorization.constants";
import { Permission } from "./permission.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
  public constructor(private readonly _reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredPermissions: Permission[] = this._reflector.getAllAndOverride(
      PERMISSIONS_METADATA_KEY,
      [context.getClass(), context.getHandler()]
    );

    if (!requiredPermissions) return true;
    if (context.getType() !== "http") return true;

    const user: User = context.switchToHttp().getRequest().user;

    if (!user) return false;

    const userHasPermission = requiredPermissions.every(
      (requiredPermission) => {
        return user.permissions.some((userPermission) => {
          return userPermission === requiredPermission;
        });
      }
    );

    return userHasPermission;
  }
}
