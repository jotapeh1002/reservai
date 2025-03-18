import { Request, Response } from "express";
import { CreateRestaurant } from "../../../../domain/usecase/CreateRestaurant";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class CreateRestaurantController {
    constructor(private createRestaurant: CreateRestaurant) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const userSchema = z.object({
                name: z.string().min(3,{message:"Nome muito curto"}),
                price_range: z.array(z.enum(["economico", "moderado", "luxo", "gourmet", "normal"]),{message:"Preço inválido"}),
                address: z.string().min(3,{message:"Endereço inválido"}),
                phone: z.string().min(3,{message:"Telefone inválido"}),
                open_days: z.array(z.enum(["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]),{message:"Dias inválidos"}),
                close_days: z.array(z.enum(["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]),{message:"Dias inválidos"}).optional(),
                opening_times: z.string({message:"Horário inválido"}),
                closing_times: z.string({message:"Horário inválido"}),
                photo: z.string().optional(),
                culinary_types: z.string({message:"Tipos de culinaria inválidos"}),
                description: z.string().optional(),
                pay_methods: z.array(z.enum(["dinheiro", "pix", "credito"]),{message:"Metodos de pagamento inválidos"}),
                user_id: z.string({message:"Usuário inválido"}),
            });
            const parsedData = userSchema.parse(req.body);
            await this.createRestaurant.execute(parsedData);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json(error.errors[0]?.message || "Erro ao criar restaurante");
                return
            }
            res.status(StatusCodes.BAD_REQUEST).json(error?.message || "Erro ao criar restaurante");
        }
    }
}