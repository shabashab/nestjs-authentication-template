import { RequireAuthentication } from "./require-authentication.decorator";
import { Controller, Post, Get, UseGuards } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { AuthenticationService } from "./authentication.service";
import { CurrentUser } from "./current-user.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("authentication")
export class AuthenticationController {
  public constructor(private readonly _authService: AuthenticationService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  public async authenticate(@CurrentUser() user: User) {
    const authToken = await this._authService.createAuthenticationToken(user);

    return {
      token: authToken,
    };
  }

  @Get()
  @RequireAuthentication()
  public async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
