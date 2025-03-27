import { IPasswordHasher } from "../../domain/interfaces/index";
import { ErrorApi } from "../../error/ErrorApi";
import bcrypt from "bcryptjs";

export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new ErrorApi(`Error ao executar hash do password`,402);
    }
  }
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new ErrorApi(`Error ao comparar password`,402);
    }
  }
}