import { IUser } from "../interfaces/index";

interface IRefreshToken {
    userId: string;
    refreshToken: string;
    userAgent: string;
    expire_at: Date;
}

export class GetRefreshToken {
    constructor(private iuser: IUser) { }
    execute({userId, refreshToken, userAgent, expire_at}: IRefreshToken) {
        this.iuser.saveRefreshTokens(userId, refreshToken, userAgent, expire_at);
    }
}