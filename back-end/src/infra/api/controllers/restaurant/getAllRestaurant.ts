import { Request, Response } from "express";
import { GetAllRestaurant } from "../../../../domain/usecase/GetAllRestaurant";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class GetAllRestaurantController {
    constructor(private getAllRestaurant: GetAllRestaurant) { }

    async execute(req: Request, res: Response): Promise<void> {
        const querySchema = z.object({
            page: z.string().optional().default("1").transform(Number).pipe(z.number().min(1)),
            limit: z.string().optional().default("10").transform((val) => (val === "Infinity" ? Infinity : Number(val))).pipe(z.number().min(10))
        });

        try {
            const { page, limit } = querySchema.parse(req.query);

            const restaurant = await this.getAllRestaurant.execute(page, limit);

            res.status(StatusCodes.OK).json(restaurant);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
            }
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }
}