export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone?: string | null | undefined,
    public photo?: string | null | undefined,
    public readonly created_at?: Date,
  ) { }
}