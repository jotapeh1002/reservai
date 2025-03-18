import { NextFunction, Request, Response } from "express";
import { ITokenProvider } from "../../../domain/interfaces/ITokenProvider";
import { JwtPayloadDTO } from "../../../dtos/TokenDTO";

export interface AuthRequest extends Request {
    user?: JwtPayloadDTO;
}
export class AuthToken {
    constructor(private tokenProvider: ITokenProvider) { }

    async execute(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientIP = (Array.isArray(req.headers["x-forwarded-for"])
                ? req.headers["x-forwarded-for"][0]
                : req.headers["x-forwarded-for"])
                || req.ip || req.socket.remoteAddress || "0.0.0.0";
            const token = req.headers.authorization?.split(" ")[1] || '';

            const decoded = await this.tokenProvider.verify(token)
            const {user} = decoded
            if (user?.ip !== clientIP ) throw new Error();
            req.user = new JwtPayloadDTO(user.id,user.name,user.ip);
            next();
        } catch (error: any) {
            res.status(401).json({access: 'unauthorized',message: error?.message || "Erro ao autenticar usuário"});
        }
    }
}
