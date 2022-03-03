import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CryptographyModule } from "./cryptography/cryptography.module";

@Module({
  imports: [AuthenticationModule, CryptographyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
