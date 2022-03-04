import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserNotFoundException } from "src/exceptions";

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>
  ) {}

  public async findByUsername(username: string): Promise<User> {
    const user = await this._usersRepository.findOne({
      username,
    });

    if (!user)
      throw new UserNotFoundException("User with given username not found");

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this._usersRepository.findOne({
      id,
    });

    if (!user) throw new UserNotFoundException("User with given id not found");

    return user;
  }
}
