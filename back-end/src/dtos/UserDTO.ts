import { User } from "../domain/entities/User";

export class UserDTO {
  public readonly id?: string
  public readonly name: string
  public readonly email: string
  public readonly phone?: string | null
  public readonly photo?: string | null
  public readonly created_at?: Date

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.photo = user.photo;
    this.created_at = user.created_at
  }
}

