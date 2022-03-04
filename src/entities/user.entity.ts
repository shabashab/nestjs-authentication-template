import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  public passwordHash: string;
}
