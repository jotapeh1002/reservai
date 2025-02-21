import { BcryptService } from "../../core/service/bcrypt.service";
import { JwtService } from "../../core/service/jwt.service";
import { User } from "../entity/User.entity";
import { IUserRepository } from "../repositories/user.repositories";
import { UserDto } from "../../dtos/UserDto";

export class Login {
  constructor(
    private bcrypt: BcryptService,
    private iuserRepository: IUserRepository,
    private jwtService: JwtService
  ) {}

  async execute(user: User): Promise<User> {
    if (!user.email || !user.password) {
      throw new Error("Email and password are required");
    }

    let userExists = await this.iuserRepository.findByEmail(user.email);

    if (!userExists) {
      throw new Error("User not found");
    }

    const passwordMatch = await this.bcrypt.comparePassword(
      user.password,
      userExists.password
    );

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = await this.jwtService.sign({
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
    });

    if (!token) {
      throw new Error("Error generating token");
    }

    return userExists
  }
}
