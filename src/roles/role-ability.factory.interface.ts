import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { AppAbility } from "src/casl/app-ability.type";
import { User } from "src/entities/user.entity";

export type AppAbilityBuilder = AbilityBuilder<AppAbility>;

export abstract class RoleAbilityFactory {
  public buildAbilityForUser(user: User): AppAbility {
    const abilityBuilder = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>
    );

    return this.configureAbilityBuilderForUser(user, abilityBuilder).build();
  }

  protected abstract configureAbilityBuilderForUser(
    user: User,
    builder: AppAbilityBuilder
  ): AppAbilityBuilder;
}
