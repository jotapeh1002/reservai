import { NextFunction, Request, Response } from "express";
import { ITokenProvider } from "../../../domain/interfaces/ITokenProvider";
import { JwtPayloadDTO } from "../../../dtos/TokenDTO";

export interface AuthRequest extends Request {
  acessToken?: string;
}

export class AuthTokenMiddleware {
  constructor(private tokenProvider: ITokenProvider) {}

  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const clientIP =
        (Array.isArray(req.headers["x-forwarded-for"]) ? req.headers["x-forwarded-for"][0]: req.headers["x-forwarded-for"])
        || req.ip || req.socket.remoteAddress || "0.0.0.0";

      const userAgent = req.headers["user-agent"];
      const accessToken = req.headers.authorization?.split(" ")[1] || "";
      let newAccessToken;

      try {
        const decoded = await this.tokenProvider.verify(accessToken);

        if (decoded.userAgent !== userAgent) throw new Error("Invalid user agent");
        if (decoded.ip !== clientIP) throw new Error("Invalid IP address");

      } catch (error) {
        const refreshToken = req.cookies.AuthRefreshToken;
        if (!refreshToken) throw new Error("No refresh token provided");

        const refreshDecoded = await this.tokenProvider.verifyRefreshToken(refreshToken);

        if (refreshDecoded.userAgent !== userAgent) throw new Error("Invalid user agent");
        if (refreshDecoded.ip !== clientIP) throw new Error("Invalid IP address");

        console.log("Refresh token valido", refreshDecoded);

        newAccessToken = await this.tokenProvider.sign({
          id: refreshDecoded.id,
          name: refreshDecoded.name,
          ip: refreshDecoded.ip,
          userAgent: refreshDecoded.userAgent
        });

        console.log("Novo token gerado", newAccessToken);
      }
      req.acessToken = newAccessToken || undefined;
      next();
    } catch (error: any) {
      res.status(401).json({
        access: "unauthorized",
        message: error?.message || "Erro ao autenticar usuário",
      });
    }
  }
}