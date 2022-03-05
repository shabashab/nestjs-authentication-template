import { Permission } from "src/authorization/permission.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  @Column()
  public passwordHash: string;

  @Column({
		type: "enum",
		enum: Permission
	})
  public permissions: Permission[];
}
