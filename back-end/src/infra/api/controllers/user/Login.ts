import { Request, Response } from "express";
import { LoginUser } from "../../../../domain/usecase/LoginUser";
import { z } from "zod";
import { ErrorApi } from "../../../../error/ErrorApi";
import { ErrorZod } from "../../../../error/ErrorZod";

export class LoginController {
  constructor(private longinUseCase: LoginUser) {}

  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      email: z.string().email("Campos inválidos"),
      password: z.string().min(0, "Campos inválidos"),
    });
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new ErrorZod(parsedData.error.errors,400);
    }
    const { email, password } = parsedData.data;

    const userAgent = req.headers["user-agent"];

    if (!userAgent) throw new ErrorApi("Error ao capturar user agent", 401);

    const { accessToken, refreshToken } = await this.longinUseCase.execute({
      email,
      password,
      userAgent,
    });

    res.cookie("AuthRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ statusCode: 200, messsage: accessToken });
  }
}
