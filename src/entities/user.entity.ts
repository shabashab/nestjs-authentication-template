import { Permission } from "src/authorization/permission.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  @Column()
  @Exclude()
  public passwordHash: string;

  @Column({
    type: "enum",
    enum: Permission,
  })
  @Exclude()
  public permissions: Permission[];
}
