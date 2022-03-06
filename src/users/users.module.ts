import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CryptographyModule } from "src/cryptography/cryptography.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptographyModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
