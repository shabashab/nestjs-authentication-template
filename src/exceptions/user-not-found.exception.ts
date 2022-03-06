import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor(message: string = "") {
    super("User with given parameters hasn't been found. " + message);
  }
}
