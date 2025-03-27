import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../domain/interfaces/index";
import { RefreshTokens, User } from "../../../domain/entities/index";

export class UserRepository implements IUser {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  async createUser(user:User): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
  async findByName(name: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { name },
    });
  }
  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
  async saveRefreshTokens( userId: string,refreshToken: string, userAgent: string,expire_at: Date ): Promise<RefreshTokens> {
    return await this.prisma.refreshTokens.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
        userAgent: userAgent,
        expire_at: expire_at
      },
    });
  }
  async revokedRefreshToken(userId: string,revoked: boolean, userAgent: string): Promise<RefreshTokens[]|RefreshTokens> {
    return await this.prisma.refreshTokens.updateManyAndReturn({
      where: { userAgent: userAgent, userId: userId },
      data: {
        revoked: revoked,
        revoked_at: new Date(),
      },
    });    
  }  
  async getRefreshTokenByRefreshToken(refreshToken: string): Promise<RefreshTokens | null> {
    return await this.prisma.refreshTokens.findUnique({
      where: { refreshToken: refreshToken },
    });
  }
}
