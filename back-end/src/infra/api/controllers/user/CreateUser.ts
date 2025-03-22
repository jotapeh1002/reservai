import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "../../../../domain/usecase/CreateUser";
import { User } from "../../../../domain/entities/User";
import { z } from "zod";

export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      name: z.string().min(3, { message: "Nome muito curto" }),
      email: z.string().email({ message: "Campos inválidos" }),
      password: z.string().min(8, { message: "Senha muito curta" }),
      phone: z.string().min(3, { message: "Telefone inválido" }),
      photo: z.string().optional(),
    });
    const parsedData = userSchema.parse(req.body);

    const { name, email, password, phone, photo } = parsedData;

    console.log("email",email);
    console.log("nome",name);

    try {
      const clientIP =
        (Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : req.headers["x-forwarded-for"]) ||
        req.ip ||
        req.socket.remoteAddress ||
        "0.0.0.0";

      const userAgent = req.headers["user-agent"];
      if (!userAgent) throw new Error();

      const user = new User(name, email, password, phone, photo);
      const {accessToken,refreshToken} = await this.createUser.execute(user, clientIP, userAgent);

      // res.cookie("AuthRefreshToken", refreshToken, {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   sameSite: "strict",
      //   // secure: true,
      // });

      res.status(StatusCodes.CREATED).json({accessToken:accessToken});
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(error.errors[0]?.message || "Erro ao registrar usuário");
        return;
      }
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(error?.message || "Erro ao registrar usuário");
    }
  }
}
