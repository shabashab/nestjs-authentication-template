import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CryptographyModule } from "src/cryptography/cryptography.module";
import { CaslModule } from "src/casl/casl.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptographyModule, CaslModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
