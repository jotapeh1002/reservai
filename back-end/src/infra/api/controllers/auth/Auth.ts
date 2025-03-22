import { Response } from "express";
import { AuthRequest } from "../../middleware/index";

export class Auth {
    async execute(req: AuthRequest, res: Response): Promise<void> {
        res.status(200).json({acess: 'authorized', acessToken: req.acessToken});
    }
}