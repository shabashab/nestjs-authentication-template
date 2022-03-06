import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserNotFoundException } from "src/exceptions";
import { CreateUserDto } from "./dto/create-user.dto";
import { CryptographyService } from "src/cryptography/cryptography.service";
import { Permission } from "src/authorization/permission.enum";

const DEFAULT_USER_PERMISSIONS: Permission[] = [Permission.login];

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    private readonly _cryptoService: CryptographyService
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

  public async checkIsUsernameAvailable(username: string): Promise<boolean> {
    const sameUsernameUser = this.findByUsername(username);
    return !sameUsernameUser;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    if (!this.checkIsUsernameAvailable(createUserDto.username)) {
      throw new ConflictException(
        "The user with specified username already exists"
      );
    }

    const passwordHash = await this._cryptoService.createPasswordHash(
      createUserDto.password
    );

    const userObject = this._usersRepository.save({
      username: createUserDto.username,
      passwordHash,
      DEFAULT_USER_PERMISSIONS,
    });

    const user = new User();
    Object.assign(user, userObject);

    return user;
  }
}
