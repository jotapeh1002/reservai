import { ErrorApi } from "../../error/ErrorApi";
import { User } from "../entities/index";
import { IPasswordHasher, ITokenProvider } from "../interfaces/index";
import { IUser } from "../interfaces/index";

interface ICreateUser {
    user: User;
    userAgent: string
}

export class CreateUser {
    constructor(
        private iuser: IUser,
        private itokenProvider: ITokenProvider,
        private ipasswordHasher: IPasswordHasher
    ) { }
    async execute({user,userAgent}:ICreateUser): Promise<{ accessToken: string; refreshToken: string }> {

        const userEmailIsExists = await this.iuser.findByEmail(user.email);
        const userNameIsExists = await this.iuser.findByName(user.name);

        if (userEmailIsExists?.email) throw new ErrorApi("Esse email ja esta cadastrado, efetue o login",400);
        if (userNameIsExists?.name) throw new ErrorApi("Nome inválido",400);

        const hashedPassword = await this.ipasswordHasher.hash(user.password);
        
        const userCreated = await this.iuser.createUser({...user,password:hashedPassword});
        const {id,name} = userCreated
        if (!userCreated || !id || !name) throw new Error("Usuario não criado");

        const accessToken = await this.itokenProvider.sign({
            id: id,
            name: name,
            userAgent: userAgent
        });
        const refreshToken = await this.itokenProvider.signRefreshToken({
            id: id,
            name: name,
            userAgent: userAgent
        });

        const decodedRefreshToken = await this.itokenProvider.verifyRefreshToken(refreshToken);

        const {exp} = decodedRefreshToken
    
        if(!exp) throw new ErrorApi("Invalid refresh token expiration",404);

        const savedRefreshToken = await this.iuser.saveRefreshTokens(id, refreshToken, userAgent, new Date(exp * 1000));

        if (!savedRefreshToken) throw new ErrorApi("Error to create refresh token in table",400);

        return { accessToken, refreshToken }
    }
}