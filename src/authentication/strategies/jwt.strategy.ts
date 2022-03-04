import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { configLiterals } from "src/config";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _usersService: UsersService,
    _configService: ConfigService
  ) {
    const jwtSecret = _configService.get<string>(configLiterals.JWT_SECRET_KEY);

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    };

    super(options);
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      return await this._usersService.findById(payload.sub);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
