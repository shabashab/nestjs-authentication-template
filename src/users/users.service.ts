import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserNotFoundException } from "src/exceptions";
import { CreateUserDto } from "./dto/create-user.dto";
import { CryptographyService } from "src/cryptography/cryptography.service";
import { RoleName } from "src/roles/role-name.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

const DEFAULT_USER_ROLE: RoleName = RoleName.User;

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    private readonly _cryptoService: CryptographyService
  ) {}

  public async findAll(): Promise<User[]> {
    return await this._usersRepository.find();
  }

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
    try {
      await this.findByUsername(username);
      return false;
    } catch (e) {
      return true;
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    if (!(await this.checkIsUsernameAvailable(createUserDto.username))) {
      throw new ConflictException(
        "The user with specified username already exists"
      );
    }

    const passwordHash = await this._cryptoService.createPasswordHash(
      createUserDto.password
    );

    const userObject = await this._usersRepository.save({
      username: createUserDto.username,
      passwordHash,
      role: DEFAULT_USER_ROLE,
    });

    const user = new User();
    Object.assign(user, userObject);

    return user;
  }

  public async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.create(createUserDto);
    user.role = RoleName.Admin;
    await this._usersRepository.save(user);
    return user;
  }

  public async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.findById(id);
    user.passwordHash = await this._cryptoService.createPasswordHash(
      updateUserDto.password
    );
    await this._usersRepository.save(user);
    return user;
  }

  public async deleteUserById(id: string): Promise<User> {
    const user = await this.findById(id);
    await this._usersRepository.delete({ id });
    return user;
  }
}
