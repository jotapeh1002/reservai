import jwt from "jsonwebtoken";
import "dotenv/config";

export class JwtService {
  async sign(payload: any): Promise<string> {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      } else if (payload === null) {
        throw new Error("Payload is null");
      }
      return await jwt.sign(payload, process.env.JWT_SECRET as string);
    } catch (error) {
      throw new Error(`Error signing JWT: ${error}`);
    }
  }
}
