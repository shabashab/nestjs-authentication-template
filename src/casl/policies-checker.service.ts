import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { AppAbility } from "./app-ability.type";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { PolicyHandler } from "./policy-handler.type";

@Injectable()
export class PoliciesCheckerService {
  public constructor(
    private readonly _caslAbilityFactory: CaslAbilityFactory
  ) {}

  private executePolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility
  ): boolean {
    if (typeof handler === "function") return handler(ability);
    return handler.handle(ability);
  }

  public checkPoliciesForUser(
    user: User,
    policyHandlers: PolicyHandler[]
  ): boolean {
    const ability = this._caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.executePolicyHandler(handler, ability)
    );
  }

	public checkPoliciesForUserOrThrowForbidden(
		user: User,
		policyHandlers: PolicyHandler[],
		exceptionMessage?: string
	) {
		const result = this.checkPoliciesForUser(user, policyHandlers);

		if(result) return;
		throw new ForbiddenException(exceptionMessage);
	}
}
