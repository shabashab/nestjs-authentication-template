import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { RolesService } from "src/roles/roles.service";
import { AppAbility } from "./app-ability.type";

@Injectable()
export class CaslAbilityFactory {
  public constructor(private readonly _rolesService: RolesService) {}

  public createForUser(user: User): AppAbility {
    const abilityFactory = this._rolesService.getRoleAbilityFactoryByName(
      user.role
    );
    return abilityFactory.buildAbilityForUser(user);
  }
}
