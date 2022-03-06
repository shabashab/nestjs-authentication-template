import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { RequireAuthentication } from "src/authentication/require-authentication.decorator";
import { CheckPolicies } from "src/casl/check-policies.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  CreateUserPolicyHandler,
  DeleteUserPolicyHandler,
  ReadUserPolicyHandler,
  UpdateUserPolicyHandler,
} from "./policy-handlers";
import { UsersService } from "./users.service";

@Controller("users")
@RequireAuthentication()
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  @Get()
  @CheckPolicies(ReadUserPolicyHandler)
  public async getUsers() {
    return await this._usersService.findAll();
  }

  @Get(":id")
  @CheckPolicies(ReadUserPolicyHandler)
  public async getUserById(@Param(ParseUUIDPipe) id: string) {
    return await this._usersService.findById(id);
  }

  @Post()
  @CheckPolicies(CreateUserPolicyHandler)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.create(createUserDto);
  }

  @Post("admin")
  @CheckPolicies(CreateUserPolicyHandler, UpdateUserPolicyHandler)
  public async createAdminUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.createAdmin(createUserDto);
  }

  @Put(":id")
  @CheckPolicies(UpdateUserPolicyHandler)
  public async updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this._usersService.updateUserById(id, updateUserDto);
  }

  @Delete(":id")
  @CheckPolicies(DeleteUserPolicyHandler)
  public async deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    return await this._usersService.deleteUserById(id);
  }
}
