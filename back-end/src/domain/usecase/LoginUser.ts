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
    if (!userExists) throw new Error("Email or password incorrect");

    const passwordMatch = await this.ipasswordHasher.comparePassword( password, userExists?.password );
    if (!passwordMatch) throw new Error("Email or password incorrect");

    const token = await this.itokenProvider.sign({...userExists, ip: clientIP});
    return token;
  }
}