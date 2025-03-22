import jwt, { JwtPayload } from "jsonwebtoken";
import { ITokenProvider } from "../../domain/interfaces/index";
import "dotenv/config";

export class TokenProvider implements ITokenProvider {
  async sign(payload: JwtPayload): Promise<string> {
    if (!process.env.JWT_SECRET) throw new Error("Missing JWT secrets");
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
  }
  async signRefreshToken(payload: JwtPayload): Promise<string > {
    if (!process.env.JWT_REFRESH_SECRET)  throw new Error("Missing JWT secrets");
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })
  }
  async verify(token: string): Promise<JwtPayload> {
    if (!process.env.JWT_SECRET) throw new Error("Missing JWT secret");
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch {
      throw new Error("Invalid Token");
    }
  }
  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    if (!process.env.JWT_REFRESH_SECRET) throw new Error("Missing JWT refresh secret");
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch {
      throw new Error("Invalid Refresh Token");
    }
  } 
  async decode(token: string): Promise<JwtPayload> {
    if (!process.env.JWT_SECRET) throw new Error("Missing JWT secret");
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      throw new Error("Invalid Token");
    }
  }
}