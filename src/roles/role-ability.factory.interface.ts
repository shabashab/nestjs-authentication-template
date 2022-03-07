import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from "@casl/ability";
import { AppAbility, Subjects } from "src/casl/app-ability.type";
import { User } from "src/entities/user.entity";

export type AppAbilityBuilder = AbilityBuilder<AppAbility>;

export abstract class RoleAbilityFactory {
  public buildAbilityForUser(user: User): AppAbility {
    const abilityBuilder = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>
    );

    this.configureAbilityBuilderForUser(user, abilityBuilder).build();

    return abilityBuilder.build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  protected abstract configureAbilityBuilderForUser(
    user: User,
    builder: AppAbilityBuilder
  ): AppAbilityBuilder;
}
