import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginUser } from "../../../../domain/usecase/LoginUser";
import { z } from "zod";

export class LoginController {
  constructor(private longinUseCase: LoginUser) {}

  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      email: z.string().email("Campos inválidos"),
      password: z.string(),
    });
    try {
      const parsedData = userSchema.parse(req.body);
      const { email, password } = parsedData;

      const clientIP =
        (Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : req.headers["x-forwarded-for"]) ||
        req.ip ||
        req.socket.remoteAddress ||
        "0.0.0.0";
      const token = await this.longinUseCase.execute(email, password, clientIP);
      res.status(StatusCodes.ACCEPTED).json(token)
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json(error.errors[0]?.message || "Erro ao tentar logar");
        return
      }
      res.status(StatusCodes.BAD_REQUEST).json(error?.message || "Erro ao tentar logar");
    }
  }
}
