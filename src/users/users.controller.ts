import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { RequireAuthentication } from "src/authentication/require-authentication.decorator";
import { CheckPolicies } from "src/casl/check-policies.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  CreateUserPolicyHandler,
  ReadUserPolicyHandler,
} from "./policy-handlers";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get()
  @RequireAuthentication()
  @CheckPolicies(ReadUserPolicyHandler)
  public async getUsers() {
    return await this._usersService.findAll();
  }

  @Get(":id")
  @RequireAuthentication()
  @CheckPolicies(ReadUserPolicyHandler)
  public async getUserById(@Param(ParseUUIDPipe) id: string) {
    return await this._usersService.findById(id);
  }

  @Post()
  @RequireAuthentication()
  @CheckPolicies(CreateUserPolicyHandler)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.create(createUserDto);
  }
}
