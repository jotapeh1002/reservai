import { JwtPayloadDTO } from "../../dtos/TokenDTO";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { ITokenProvider } from "../interfaces/ITokenProvider";
import { IUser } from "../interfaces/IUser";

export class LoginUser {
  constructor(
    private ipasswordHasher: IPasswordHasher,
    private itokenProvider: ITokenProvider,
    private iuser: IUser
  ) { }

  async execute(email: string, password: string, clientIP: string): Promise<string> {

    const userExists = await this.iuser.findByEmail(email);
    if (!userExists) throw new Error("Email ou senha incorretos");

    const passwordMatch = await this.ipasswordHasher.comparePassword( password, userExists?.password );
    if (!passwordMatch) throw new Error("Email ou senha incorretos");

    const token = await this.itokenProvider.sign(new JwtPayloadDTO(userExists.id||'' ,userExists.name, clientIP));
    return token;
  }
}