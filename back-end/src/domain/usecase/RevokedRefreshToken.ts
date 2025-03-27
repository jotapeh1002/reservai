import { IUser } from "../interfaces/index";

interface IRevokedRefreshToken {
    userId: string
    revoked: boolean
    userAgent: string
}

export class RevokedRefreshToken {
    constructor(private iuser: IUser) { }

    execute({userId,revoked, userAgent}: IRevokedRefreshToken) {
        this.iuser.revokedRefreshToken(userId,revoked,userAgent);
    }
}