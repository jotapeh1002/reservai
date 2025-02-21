import { User } from "../entity/User.entity.js";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
