import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "src/authentication/current-user.decorator";
import { RequireAuthentication } from "src/authentication/require-authentication.decorator";
import { CheckPolicies } from "src/casl/check-policies.decorator";
import { PoliciesCheckerService } from "src/casl/policies-checker.service";
import { PoliciesGuard } from "src/casl/policies.guard";
import { User } from "src/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { userPolicyHandlers } from "./policy-handlers";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(PoliciesGuard)
@RequireAuthentication()
export class UsersController {
  public constructor(
    private readonly _usersService: UsersService,
    private readonly _policiesCheckerService: PoliciesCheckerService
  ) {}

  @Get()
  @CheckPolicies(userPolicyHandlers.readAll)
  public async getUsers() {
    return await this._usersService.findAll();
  }

  @Get(":id")
  public async getUserById(
    @CurrentUser() user: User,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    this._policiesCheckerService.checkPoliciesForUserOrThrowForbidden(user, [
      userPolicyHandlers.read.forSingle(user),
    ]);

    return await this._usersService.findById(id);
  }

  @Post()
  @CheckPolicies(userPolicyHandlers.create.forEvery)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.create(createUserDto);
  }

  @Post("admin")
  public async createAdminUser(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.createAdmin(createUserDto);
  }

  @Put(":id")
  @CheckPolicies(userPolicyHandlers.update.forEvery)
  public async updateUser(
    @CurrentUser() user: User,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    this._policiesCheckerService.checkPoliciesForUserOrThrowForbidden(user, [
      userPolicyHandlers.update.forSingle(user),
    ]);

    return await this._usersService.updateUserById(id, updateUserDto);
  }

  @Delete(":id")
  @CheckPolicies(userPolicyHandlers.delete.forEvery)
  public async deleteUser(
    @CurrentUser() user: User,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    this._policiesCheckerService.checkPoliciesForUserOrThrowForbidden(user, [
      userPolicyHandlers.delete.forSingle(user),
    ]);

    return await this._usersService.deleteUserById(id);
  }
}
