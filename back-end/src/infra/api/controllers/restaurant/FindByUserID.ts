import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FindRestaurantByUserID } from "../../../../domain/usecase/FindRestaurantByUserID";

export class FindByUserIDController {
    constructor(private findByUserID: FindRestaurantByUserID) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { userid } = req.params;
            const restaurant = await this.findByUserID.execute(userid);
            res.status(StatusCodes.OK).json(restaurant);
        } catch (error: any) {
            console.error(`${error}`)
            res.status(StatusCodes.BAD_REQUEST).json(error.errors[0]?.message || "Erro ao buscar restaurante por id");
        }
    }
}