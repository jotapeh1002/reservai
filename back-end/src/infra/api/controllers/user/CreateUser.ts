import { CreateUser } from "../../../../domain/usecase/CreateUser";
import { User } from "../../../../domain/entities/User";
import { ErrorApi } from "../../../../error/ErrorApi";
import { Request, Response } from "express";
import { z } from "zod";
import { ErrorZod } from "../../../../error/ErrorZod";

export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      password: z.string().min(8, { message: "Senha muito curta" }),
      phone: z.string().min(3, { message: "Telefone inválido" }),
      name: z.string().min(3, { message: "Nome muito curto" }),
      email: z.string().email({ message: "Campos inválidos" }),
      photo: z.string().optional(),
    });

    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new ErrorZod(parsedData.error.errors,400);
    }

    const { name, email, password, phone, photo } = parsedData.data;

    const userAgent = req.headers["user-agent"];

    if (!userAgent) throw new ErrorApi("Error ao capturar user agent", 401);

    const user = new User(name, email, password, phone, photo);
    const { accessToken, refreshToken } = await this.createUser.execute({
      user,
      userAgent,
    });

    res.cookie("AuthRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ statusCode: 200, message: accessToken });
  }
}
