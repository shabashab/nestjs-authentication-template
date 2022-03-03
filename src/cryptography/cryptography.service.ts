import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

//TODO: move hash salt rounds count to config 
const HASH_SALT_ROUNDS = 10;

@Injectable()
export class CryptographyService {
	public async comparePassword(
		password: string,
		passwordHash: string
	): Promise<boolean> {
		return await bcrypt.compare(password, passwordHash);
	}	

	public async createPasswordHash(
		password: string
	): Promise<string> {
		return await bcrypt.hash(password, HASH_SALT_ROUNDS);	
	}
}
