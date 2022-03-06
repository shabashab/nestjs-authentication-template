import { Action } from "src/casl/action.enum";
import { User } from "src/entities/user.entity";
import {
  AppAbilityBuilder,
  RoleAbilityFactory,
} from "../role-ability.factory.interface";

export class AdminRoleAbilityFactory extends RoleAbilityFactory {
  configureAbilityBuilderForUser(
    _user: User,
    builder: AppAbilityBuilder
  ): AppAbilityBuilder {
    builder.can(Action.Manage, User);

    return builder;
  }
}
