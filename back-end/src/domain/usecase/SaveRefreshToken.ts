import { IUser } from "../interfaces/index";

export class GetRefreshToken {
    constructor(private iuser: IUser) { }

    execute( userId: string, refreshToken: string, userAgent: string, ipAddress: string, expire_at: Date, revoked?: boolean, revoked_at?: Date) {
        this.iuser.saveRefreshTokens(userId, refreshToken, userAgent, ipAddress, expire_at, revoked, revoked_at);
    }
}