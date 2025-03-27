import { Request, Response } from "express";
import { ITokenProvider,IUser  } from "../../../../domain/interfaces/index";
import { ErrorApi } from "../../../../error/ErrorApi";

export class AuthRefreshTokenController {
  constructor(
    private tokenProvider: ITokenProvider,
    private user: IUser
  ) {}

  async execute(req: Request, res: Response) {
    
    const refreshToken = req.cookies.AuthRefreshToken;
    if (!refreshToken) throw new ErrorApi("Erro ao capturar refresh token",401);
    
    const userAgent = req.headers["user-agent"];

    const refreshDecoded = await this.tokenProvider.verifyRefreshToken(refreshToken); 
    if (refreshDecoded.userAgent !== userAgent) throw new ErrorApi("Refresh token invalid",401);

    const refreshTokenDB = await this.user.getRefreshTokenByRefreshToken(refreshToken);
    if (!refreshTokenDB) throw new ErrorApi("Refresh token invalido",404);

    const refreshDecodedDB = await this.tokenProvider.verifyRefreshToken(refreshTokenDB.refreshToken);

    const isTokenConsistent = refreshDecoded.id === refreshTokenDB.userId 
    && refreshDecodedDB.name === refreshDecoded.name && refreshTokenDB.revoked === false 
    && refreshDecoded.userAgent === userAgent;

    if (!isTokenConsistent)  throw new ErrorApi("Refresh Token inconsistente",401);

    const newAccessToken = await this.tokenProvider.sign({
      id: refreshDecoded.id,
      name: refreshDecoded.name,
      userAgent: refreshDecoded.userAgent
    });

    res.status(200).json({ statusCode: 200, message:"Authorized", accessToken: newAccessToken });
  }
}