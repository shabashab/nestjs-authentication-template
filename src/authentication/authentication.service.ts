import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CryptographyService } from "src/cryptography/cryptography.service";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _cryptoService: CryptographyService,
    private readonly _jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    try {
      const user = await this._usersService.findByUsername(username);
      const isPasswordValid = this._cryptoService.comparePassword(
        password,
        user.passwordHash
      );

      if (isPasswordValid) return user;
    } catch (e) {
      //Ignore
    }

    throw new UnauthorizedException();
  }

  private createJwtPayload(user: User): JwtPayload {
    return {
      sub: user.id,
    };
  }

  public async createAuthenticationToken(user: User): Promise<string> {
    const payload = this.createJwtPayload(user);
    return await this._jwtService.signAsync(payload);
  }
}
