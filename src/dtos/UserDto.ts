import { User } from "../domain/entity/User.entity";

export class UserDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly token: string;

  constructor(user: User, token: string) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.token = token;
  }
}
