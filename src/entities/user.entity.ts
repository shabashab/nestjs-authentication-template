import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { RoleName } from "src/roles/role-name.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  public passwordHash: string;

  @Column({
    type: "enum",
    enum: RoleName,
    nullable: false,
    default: RoleName.User,
  })
  public role: RoleName;
}
