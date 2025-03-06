import { Request, Response } from "express";
import { CreateRestaurant } from "../../../../domain/usecase/CreateRestaurant";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class CreateRestaurantController {
    constructor(private createRestaurant: CreateRestaurant) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const userSchema = z.object({
                name: z.string().min(3),
                price_range: z.array(z.enum(["economico", "moderado", "luxo", "gourmet", "normal"])),
                address: z.string().min(3),
                phone: z.string().optional(),
                open_days: z.array(z.enum(["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"])),
                close_days: z.array(z.enum(["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"])).optional(),
                opening_times: z.string(),
                closing_times: z.string(),
                photo: z.string().optional(),
                culinary_types: z.string(),
                description: z.string().optional(),
                pay_methods: z.array(z.enum(["dinheiro", "pix", "credito"])),
                user_id: z.string(),
            });
            const parsedData = userSchema.parse(req.body);

            const user = await this.createRestaurant.execute(parsedData);
            res.status(StatusCodes.CREATED).json({ "exec": "user created", user });
        } catch (error: any) {
            console.error(`${error}`)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}