import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CryptographyService } from "src/cryptography/cryptography.service";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _cryptoService: CryptographyService
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
}
