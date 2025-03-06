import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtPayloadDTO } from "../../dtos/TokenDTO";
import { ITokenProvider } from "../../domain/interfaces/ITokenProvider";
import "dotenv/config";

export class TokenProvider implements ITokenProvider {
  async sign(payload: JwtPayloadDTO): Promise<string> {
    try {
      if (!process.env.JWT_SECRET || payload === null) throw new Error("JWT_SECRET or Payload is not exists");
      return await jwt.sign({ ...payload, ip: payload.ip }, process.env.JWT_SECRET as string);
    } catch (error) {
      throw new Error(`Error signing JWT: ${error}`);
    }
  }
  async verify(token: string): Promise<JwtPayload | null> {
    try {
        if (!process.env.JWT_SECRET || token === null ) throw new Error("JWT_SECRET or Token is not exists");
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload || null;
    } catch (error) {
        throw new Error(`Error verifying JWT: ${error}`); 
    }
}
}
