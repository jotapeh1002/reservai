import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../domain/repositories/user.repositories";
import { User } from "../../../domain/entity/User.entity";

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(dataUser: User): Promise<User> {
    return await this.prisma.user.create({
      data: dataUser,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
