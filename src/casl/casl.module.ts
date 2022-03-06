import { Module } from "@nestjs/common";
import { RolesModule } from "src/roles/roles.module";
import { CaslAbilityFactory } from "./casl-ability.factory";

@Module({
  imports: [RolesModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
