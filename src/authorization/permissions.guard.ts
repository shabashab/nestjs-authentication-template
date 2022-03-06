import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { configLiterals } from "src/config";
import { User } from "src/entities/user.entity";
import { MetadataKey } from "src/metadata-key.enum";
import { Permission } from "./permission.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly _ignorePermissions: boolean;

  public constructor(
    private readonly _reflector: Reflector,
    configService: ConfigService
  ) {
    this._ignorePermissions = configService.get<boolean>(
      configLiterals.IGNORE_PERMISSIONS
    );
  }

  public canActivate(context: ExecutionContext): boolean {
		if(this._ignorePermissions) return true;

    const requiredPermissions: Permission[] = this._reflector.getAllAndOverride(
      MetadataKey.REQUIRED_PERMISSIONS,
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
