import { Action } from "src/casl/action.enum";
import { User } from "src/entities/user.entity";
import {
  AppAbilityBuilder,
  RoleAbilityFactory,
} from "../role-ability.factory.interface";

export class UserRoleAbilityFactory extends RoleAbilityFactory {
  configureAbilityBuilderForUser(
    _user: User,
    builder: AppAbilityBuilder
  ): AppAbilityBuilder {
    builder.cannot(Action.Manage, User);

    return builder;
  }
}
