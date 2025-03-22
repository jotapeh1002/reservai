import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../domain/interfaces/index";
import { User } from "../../../domain/entities/index";

export class UserRepository implements IUser {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  async createUser(user: User): Promise<User> {
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
  async saveRefreshTokens(
    userId: string,
    refreshToken: string,
    userAgent: string,
    ipAddress: string,
    expire_at: Date,
    revoked: boolean = false
  ): Promise<void> {
    const revoked_at = revoked == true ? new Date() : null;
    await this.prisma.refreshTokens.create({
      data: {
        userId,
        refreshToken,
        userAgent,
        ipAddress,
        expire_at,
        revoked,
        revoked_at,
        created_at: new Date(),
      },
    });
  }
}
