import { User } from "../entities/index.js";

export interface IUser {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  saveRefreshTokens(
    userId: string,
    refreshToken: string,
    userAgent: string,
    ipAddress: string,
    expire_at: Date,
    revoked?: boolean,
    revoked_at?: Date,
  ): Promise<void>;
}
