import { NextFunction, Request, Response } from "express";
import { ITokenProvider } from "../../../domain/interfaces/ITokenProvider";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export class AuthToken {
    constructor(private tokenProvider: ITokenProvider) { }

    async execute(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientIP = (Array.isArray(req.headers["x-forwarded-for"])
                ? req.headers["x-forwarded-for"][0]
                : req.headers["x-forwarded-for"])
                || req.ip || req.socket.remoteAddress || "0.0.0.0";
            const token = req.headers.authorization?.split(" ")[1];
            const decoded = token ? await this.tokenProvider.verify(token) : null;

            if (!decoded || typeof decoded === "string") throw new Error();
            if (decoded.ip !== clientIP) throw new Error();

            console.log(decoded);
            req.user = decoded as JwtPayload;
            next();
        } catch {
            res.status(401).json({ error: "Access denied!" });
        }
    }
}
