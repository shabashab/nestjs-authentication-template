import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { configLiterals } from "src/config";
import { UsersModule } from "src/users/users.module";
import { CryptographyModule } from "src/cryptography/cryptography.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>(configLiterals.JWT_SECRET_KEY),
        };
      },
    }),
    UsersModule,
    CryptographyModule,
  ],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
