import { User } from "../domain/entities/User";

export class JwtPayloadDTO {
  public readonly id?: string
  public readonly name: string
  public readonly email: string

  constructor(user: User, public readonly ip: string) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

