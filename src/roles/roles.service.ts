import { Injectable } from "@nestjs/common";
import { AdminRoleAbilityFactory } from "./role-ability-factories/admin-role-ability.factory";
import { UserRoleAbilityFactory } from "./role-ability-factories/user-role-ability.factory";
import { RoleAbilityFactory } from "./role-ability.factory.interface";
import { RoleName } from "./role-name.enum";

@Injectable()
export class RolesService {
  private _abilityFactories: Record<RoleName, RoleAbilityFactory>;

  public constructor(
    userRoleAbilityFactory: UserRoleAbilityFactory,
    adminRoleAbilityFactory: AdminRoleAbilityFactory
  ) {
    this._abilityFactories = {
      user: userRoleAbilityFactory,
      admin: adminRoleAbilityFactory,
    };
  }

  public getRoleAbilityFactoryByName(name: RoleName): RoleAbilityFactory {
    return this._abilityFactories[name];
  }
}
