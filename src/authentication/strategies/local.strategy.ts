import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/entities/user.entity";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    return this._authService.validateUser(username, password);
  }
}
