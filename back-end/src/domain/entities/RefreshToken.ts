export class RefreshTokens {
  constructor(
    public userId: string,
    public refreshToken: string,
    public userAgent: string,
    public ipAddress: string,
    public expire_at: Date, 
    public id?: string,
    public revoked?: boolean,
    public revoked_at?: Date,
    public created_at?: Date
  ) { }
}