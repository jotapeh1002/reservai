import { IUser } from "../interfaces";

interface IGetRefreshTokenByRefreshToken {
    refreshToken: string;
}

export class GetRefreshTokenByRefreshToken {
     constructor(private iuser: IUser) { }
        execute({refreshToken}: IGetRefreshTokenByRefreshToken ) {
            this.iuser.getRefreshTokenByRefreshToken(refreshToken);
        }
}