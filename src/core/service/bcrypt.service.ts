import bcrypt from "bcrypt";

export class BcryptService {
  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(`Error hashing password: ${error}`);
    }
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(`Error comparing passwords: ${error}`);
    }
  }
}
