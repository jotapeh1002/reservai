import { JwtPayload } from "jsonwebtoken";
import { JwtPayloadDTO } from "../../dtos/TokenDTO";

export interface ITokenProvider {
    sign(payload: JwtPayloadDTO): Promise<string>;
    verify(token: string): Promise<JwtPayload | null>;
}