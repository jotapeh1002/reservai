import { NextFunction, Request, Response } from "express";
import { ITokenProvider,IUser  } from "../../../domain/interfaces/index";
import { ErrorApi } from "../../../error/ErrorApi";

export interface AuthRequest extends Request {
  acessToken?: string;
}
export class AuthTokenMiddleware {
  constructor(
    private tokenProvider: ITokenProvider,
    private user: IUser
  ) {}

  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    
    const refreshToken = req.cookies.AuthRefreshToken;
    if (!refreshToken) throw new ErrorApi("erro ao capturar refresh token",401);
    
    const userAgent = req.headers["user-agent"];

    const refreshDecoded = await this.tokenProvider.verifyRefreshToken(refreshToken); 
    if (refreshDecoded.userAgent !== userAgent) throw new ErrorApi("Refresh token invalido",401);

    const refreshTokenDB = await this.user.getRefreshTokenByRefreshToken(refreshToken);
    if (!refreshTokenDB) throw new ErrorApi("Refresh token invalido",401);

    const refreshDecodedDB = await this.tokenProvider.verifyRefreshToken(refreshTokenDB.refreshToken);

    const isTokenConsistent = refreshDecoded.id === refreshTokenDB.userId 
    && refreshDecodedDB.name === refreshDecoded.name && refreshTokenDB.revoked === false 
    && refreshDecoded.userAgent === userAgent;

    if (!isTokenConsistent)  throw new ErrorApi("Refresh Token inconsistente",401);
    
    const accessToken = req.headers.authorization?.split(" ")[1] || "";
    if (!accessToken) throw new ErrorApi("Erro ao capturar access token",401);

    const decoded = await this.tokenProvider.verify(accessToken); 
    if (decoded.userAgent !== userAgent || decoded.id !== refreshDecoded.id) throw new Error("Invalid access token");

    req.acessToken = accessToken
    next();
  }
}