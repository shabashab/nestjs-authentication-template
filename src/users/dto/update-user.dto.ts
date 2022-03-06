import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  public password: string;
}
