import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../../../domain/usecase/CreateUser";
import { User } from "../../../../domain/entities/User";
import { z } from "zod"

export class CreateUserController {
    constructor(private createUser: CreateUser) { }

    async execute(req: Request, res: Response): Promise<void> {
        const userSchema = z.object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(6),
            phone: z.string().optional(),
            photo: z.string().optional(),
        });
        const parsedData = userSchema.parse(req.body);

        const { name, email, password, phone, photo } = parsedData;
        try {
            const clientIP = (Array.isArray(req.headers["x-forwarded-for"]) 
            ? req.headers["x-forwarded-for"][0] 
            : req.headers["x-forwarded-for"]) || req.ip || req.socket.remoteAddress || "0.0.0.0";
            const user = new User(name, email, password, phone, photo);
            const token = await this.createUser.execute(user, clientIP);
            res.status(StatusCodes.CREATED).json(token);
        } catch (error: any) {
            console.error(`${error}`)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message } );
        }
    }
}