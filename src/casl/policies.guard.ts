import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/entities/user.entity";
import { MetadataKey } from "src/metadata-key.enum";
import { PoliciesCheckerService } from "./policies-checker.service";
import { PolicyHandler } from "./policy-handler.type";

@Injectable()
export class PoliciesGuard implements CanActivate {
  public constructor(
    private readonly _reflector: Reflector,
    private readonly _policiesCheckerService: PoliciesCheckerService
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const policyHandlers = this._reflector.get<PolicyHandler[]>(
      MetadataKey.CHECK_POLICIES,
      context.getHandler()
    );

    if (!policyHandlers) return true;
    if (context.getType() !== "http") return true;

    const user: User = context.switchToHttp().getRequest().user;

    if (!user) return false;

    return this._policiesCheckerService.checkPoliciesForUser(
      user,
      policyHandlers
    );
  }
}
