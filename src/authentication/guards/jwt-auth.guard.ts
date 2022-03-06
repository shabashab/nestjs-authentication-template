import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { MetadataKey } from "src/metadata-key.enum";

export class JwtAuthGuard extends AuthGuard("jwt") {
  public constructor(private readonly _reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): any {
    const requireJwtAuthentication = this._reflector.getAllAndOverride(
      MetadataKey.REQUIRE_AUTHENTICATION,
      [context.getClass(), context.getHandler()]
    );

    if (!requireJwtAuthentication) return true;

    return super.canActivate(context);
  }
}
