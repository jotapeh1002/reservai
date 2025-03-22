import { IPasswordHasher, ITokenProvider } from "../interfaces/index";
import { IUser } from "../interfaces/index";

interface ILoginUser{
  email: string;
  password: string;
  clientIP: string;
  userAgent: string;
  revoked?: boolean;
  revoked_at?: Date
}
export class LoginUser {
  constructor(
    private ipasswordHasher: IPasswordHasher,
    private itokenProvider: ITokenProvider,
    private iuser: IUser
  ) { }

  async execute({email, password, clientIP, userAgent,revoked,revoked_at}: ILoginUser): Promise<{ accessToken: string; refreshToken: string }> {

    const findUserEmail = await this.iuser.findByEmail(email);
    if (!findUserEmail ) throw new Error("Email ou senha incorretos");
    
    const {id,name} = findUserEmail
    
    const isPasswordValid = await this.ipasswordHasher.comparePassword( password, findUserEmail?.password);
    if (!isPasswordValid) throw new Error("Email ou senha incorretos");

    const accessToken = await this.itokenProvider.sign({
      id: id,
      name: name,
      ip: clientIP,
      userAgent: userAgent,
    });
    const refreshToken = await this.itokenProvider.signRefreshToken({
      id: id,
      name: name,
      ip: clientIP,
      userAgent: userAgent
    });
    const decodedRefreshToken = await this.itokenProvider.verifyRefreshToken(refreshToken);

    const {exp} = decodedRefreshToken
    
    if(!exp) throw new Error("Invalid refresh token expiration");

    this.iuser.saveRefreshTokens(id, refreshToken, userAgent, clientIP, new Date(exp * 1000),revoked, revoked_at);

    console.log("Refresh token valido useCase", decodedRefreshToken);

    return { accessToken, refreshToken }
  }
}