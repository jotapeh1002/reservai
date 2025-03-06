import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../domain/interfaces/IUser";
import { User } from "../../../domain/entities/User";

export class UserRepository implements IUser {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }  async createUser(user: User): Promise<User> {
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
}