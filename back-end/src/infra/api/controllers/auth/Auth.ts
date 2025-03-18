import { Response } from "express";
import { AuthRequest } from "../../middleware/AuthToken";
import { StatusCodes } from "http-status-codes";

export class Auth {
    async execute(req: AuthRequest, res: Response): Promise<void> {
        res.status(200).json({access: 'authorized',user: req.user})
    }
}