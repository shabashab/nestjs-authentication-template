import { Module } from "@nestjs/common";
import { AdminRoleAbilityFactory } from "./role-ability-factories/admin-role-ability.factory";
import { UserRoleAbilityFactory } from "./role-ability-factories/user-role-ability.factory";
import { RolesService } from "./roles.service";

@Module({
  providers: [RolesService, UserRoleAbilityFactory, AdminRoleAbilityFactory],
  exports: [RolesService],
})
export class RolesModule {}
