import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CryptographyModule } from "./cryptography/cryptography.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { configLiterals, createValidationSchema } from "./config";
import { User } from "./entities/user.entity";
import { UsersModule } from "./users/users.module";
import { CaslModule } from "./casl/casl.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    AuthenticationModule,
    CryptographyModule,
    ConfigModule.forRoot({
      validationSchema: createValidationSchema(),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          host: configService.get<string>(configLiterals.PG_HOST),
          port: configService.get<number>(configLiterals.PG_PORT),
          username: configService.get<string>(configLiterals.PG_USERNAME),
          password: configService.get<string>(configLiterals.PG_PASSWORD),
          database: configService.get<string>(configLiterals.PG_DB),
          entities: [User],
          type: "postgres",
          synchronize: true,
        };
      },
    }),
    UsersModule,
    CaslModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
