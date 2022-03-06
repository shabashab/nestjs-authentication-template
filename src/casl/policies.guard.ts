import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { configLiterals } from "src/config";
import { User } from "src/entities/user.entity";
import { MetadataKey } from "src/metadata-key.enum";
import { AppAbility } from "./app-ability.type";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { PolicyHandler } from "./policy-handler.type";

@Injectable()
export class PoliciesGuard implements CanActivate {
  private readonly _ignorePolicies: boolean;

  public constructor(
    private readonly _reflector: Reflector,
    private readonly _caslAbilityFactory: CaslAbilityFactory,
    configService: ConfigService
  ) {
    this._ignorePolicies = configService.get<boolean>(
      configLiterals.IGNORE_POLICIES
    );
  }

  private executePolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility
  ): boolean {
    if (typeof handler === "function") return handler(ability);

    return handler.handle(ability);
  }

  public canActivate(context: ExecutionContext): boolean {
    if (this._ignorePolicies) return true;

    const policyHandlers = this._reflector.get<PolicyHandler[]>(
      MetadataKey.CHECK_POLICIES,
      context.getHandler()
    );

    if (!policyHandlers) return true;
    if (context.getType() !== "http") return true;

    const user: User = context.switchToHttp().getRequest().user;

    if (!user) return false;

    const ability = this._caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.executePolicyHandler(handler, ability)
    );
  }
}
