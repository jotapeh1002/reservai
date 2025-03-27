import { ITokenProvider } from "../../domain/interfaces/index";
import { ErrorApi } from "../../error/ErrorApi";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { ErrorToken } from "../../error/ErrorToken";

export class TokenProvider implements ITokenProvider {
  async sign(payload: JwtPayload): Promise<string> {
    if (!process.env.JWT_SECRET) throw new ErrorApi("Error ao capturar JWT secret",401);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
  }
  async signRefreshToken(payload: JwtPayload): Promise<string > {
    if (!process.env.JWT_REFRESH_SECRET)  throw new ErrorApi("Error ao capturar JWT secret",401);
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })
  }
  async verify(token: string): Promise<JwtPayload> {
    if (!process.env.JWT_SECRET) throw new ErrorApi("Missing JWT secret",401);
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch {
      throw new ErrorToken("Token invalido ou expirado",401,"ACCESS_TOKEN");
    }
  }
  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    if (!process.env.JWT_REFRESH_SECRET) throw new ErrorApi("Error ao capturar JWT secret",401);
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch {
      throw new ErrorToken("Refresh Token invalido ou expirado",401,"REFRESH_TOKEN");
    }
  } 
}