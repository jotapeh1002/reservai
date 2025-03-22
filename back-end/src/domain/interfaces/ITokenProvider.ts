import { JwtPayload } from "jsonwebtoken";

export interface ITokenProvider {
  sign(payload: JwtPayload): Promise<string>;
  signRefreshToken(payload: JwtPayload): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
  verifyRefreshToken(token:string): Promise<JwtPayload>
  decode(token: string): Promise<JwtPayload>
}
