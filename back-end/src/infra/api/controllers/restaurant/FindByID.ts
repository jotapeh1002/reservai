import { FindRestaurantByID } from "../../../../domain/usecase/FindByRestaurantID";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class FindByNome {
    constructor(private findByID: FindRestaurantByID) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const restaurant = await this.findByID.execute(name);
            res.status(StatusCodes.OK).json(restaurant);
        } catch (error: any) {
            console.error(`${error}`)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}