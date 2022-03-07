import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor(message = "") {
    super("User with given parameters hasn't been found. " + message);
  }
}
