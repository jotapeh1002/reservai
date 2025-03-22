export class UserDTO {
  public readonly id?: string
  public readonly name: string
  public readonly email: string
  public readonly phone?: string | null
  public readonly photo?: string | null
  public readonly created_at?: Date

  constructor(name: string, email: string, phone?: string | null, photo?: string | null, created_at?: Date, id?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
    this.created_at = created_at
  }
}

