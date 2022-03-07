import { Module } from "@nestjs/common";
import { RolesModule } from "src/roles/roles.module";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { PoliciesCheckerService } from "./policies-checker.service";

@Module({
  imports: [RolesModule],
  providers: [CaslAbilityFactory, PoliciesCheckerService],
  exports: [CaslAbilityFactory, PoliciesCheckerService],
})
export class CaslModule {}
