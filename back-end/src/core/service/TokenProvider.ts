import jwt from "jsonwebtoken";
import { JwtPayloadDTO } from "../../dtos/TokenDTO";
import { ITokenProvider } from "../../domain/interfaces/ITokenProvider";
import "dotenv/config";

export class TokenProvider implements ITokenProvider {
  async sign(payload: JwtPayloadDTO): Promise<string> {
    try {
      if (!process.env.JWT_SECRET || !payload)
        throw new Error("JWT_SECRET or Payload is not exists");
      return jwt.sign(
        { ...payload, ip: payload.ip },
        process.env.JWT_SECRET as string
      );
    } catch (error) {
      throw new Error(`Error signing JWT: ${error}`);
    }
  }
  async verify(token: string): Promise<{ user?: JwtPayloadDTO }> {
    try {
      if (!process.env.JWT_SECRET || !token) {
        throw new Error("JWT_SECRET or Token is missing");
      }
      const user = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayloadDTO;
      return { user: user };
    } catch {
      throw new Error("Invalid token");
    }
  }
}
