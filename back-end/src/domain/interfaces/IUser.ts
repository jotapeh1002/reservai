import { User } from "../entities/User.js";

export interface IUser {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}
