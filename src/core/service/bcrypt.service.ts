import bcrypt from "bcrypt";

export class BcryptService {
  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(`Error hashing password: ${error}`);
    }
  }
}
