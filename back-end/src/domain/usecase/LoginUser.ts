import { ErrorApi } from "../../error/ErrorApi";
import { IPasswordHasher, ITokenProvider } from "../interfaces/index";
import { IUser } from "../interfaces/index";

interface ILoginUser{
  email: string;
  password: string;
  userAgent: string;
}
export class LoginUser {
  constructor(
    private ipasswordHasher: IPasswordHasher,
    private itokenProvider: ITokenProvider,
    private iuser: IUser
  ) { }

  async execute({email, password, userAgent}: ILoginUser): Promise<{ accessToken: string; refreshToken: string }> {

    const findUserEmail = await this.iuser.findByEmail(email);
    if (!findUserEmail ) throw new ErrorApi("Email ou senha incorretos",401);
    
    const {id,name} = findUserEmail
    
    const isPasswordValid = await this.ipasswordHasher.comparePassword( password, findUserEmail?.password);
    if (!isPasswordValid ||!id || !name) throw new ErrorApi("Email ou senha incorretos",401);

    const accessToken = await this.itokenProvider.sign({
      id: id,
      name: name,
      userAgent: userAgent,
    });
    const refreshToken = await this.itokenProvider.signRefreshToken({
      id: id,
      name: name,
      userAgent: userAgent
    });
    const decodedRefreshToken = await this.itokenProvider.verifyRefreshToken(refreshToken);

    const {exp} = decodedRefreshToken
    
    if(!exp) throw new ErrorApi("Invalid refresh token expiration",401);

    const savedRefreshToken = await this.iuser.saveRefreshTokens(id, refreshToken, userAgent, new Date(exp * 1000));

    if (!savedRefreshToken) throw new ErrorApi("Error to create refresh token in table",401);

    return { accessToken, refreshToken }
  }
}