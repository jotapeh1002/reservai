import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginUser } from "../../../../domain/usecase/LoginUser";
import { z } from "zod";

export class LoginController {
    constructor(private longinUseCase: LoginUser) { }

    async execute(req: Request, res: Response): Promise<void> {
        const userSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });
        const parsedData = userSchema.parse(req.body);
        const { email, password } = parsedData;
        try {
            const clientIP = (Array.isArray(req.headers["x-forwarded-for"]) 
            ? req.headers["x-forwarded-for"][0] 
            : req.headers["x-forwarded-for"]) || req.ip || req.socket.remoteAddress || "0.0.0.0";        
            const user = await this.longinUseCase.execute(email, password, clientIP);
            res.status(StatusCodes.OK).json(user);

        } catch (error: any) {
            console.error(`${error}`)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}