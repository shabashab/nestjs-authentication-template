import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { configLiterals } from "src/config";

import * as bcrypt from "bcrypt";

@Injectable()
export class CryptographyService {
  private _hashSaltRounds: number;

  public constructor(_configService: ConfigService) {
    this._hashSaltRounds = _configService.get<number>(
      configLiterals.HASH_SALT_ROUNDS
    );
  }

  public async comparePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  public async createPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this._hashSaltRounds);
  }
}
