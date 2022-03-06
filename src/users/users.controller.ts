import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { RequireAuthentication } from "src/authentication/require-authentication.decorator";
import { Permission } from "src/authorization/permission.enum";
import { RequirePermissions } from "src/authorization/require-permissions.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get(":id")
  @RequireAuthentication()
  @RequirePermissions(Permission.getUsersList)
  public async getUserById(@Param(ParseUUIDPipe) id: string) {
    return await this._usersService.findById(id);
  }

  @Post()
  @RequireAuthentication()
  @RequirePermissions(Permission.createUsers)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.create(createUserDto);
  }
}
