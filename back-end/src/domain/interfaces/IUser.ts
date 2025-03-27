import { RefreshTokens, User } from "../entities/index.js";

export interface IUser {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  saveRefreshTokens(
    userId: string,
    refreshToken: string,
    userAgent: string,
    expire_at: Date
  ): Promise<RefreshTokens>;
  revokedRefreshToken(
    userId: string,
    revoked: boolean,
    userAgent: string
  ): Promise<RefreshTokens[]|RefreshTokens>;
  getRefreshTokenByRefreshToken(refreshToken: string): Promise<RefreshTokens | null>;
}
