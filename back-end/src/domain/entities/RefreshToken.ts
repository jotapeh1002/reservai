export class RefreshTokens {
  constructor(
    public id: string,
    public userId: string,
    public refreshToken: string,
    public userAgent: string,
    public expire_at: Date, 
    public revoked: boolean,
    public revoked_at?: Date | null,
    public created_at?: Date
  ) { }
}