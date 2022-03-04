export class UserNotFoundException extends Error {
  constructor(message: string = "") {
    super("User with given parameters hasn't been found. " + message);
  }
}
