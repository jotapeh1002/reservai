import { User } from "../entities/index";
import { IPasswordHasher, ITokenProvider } from "../interfaces/index";
import { IUser } from "../interfaces/index";

export class CreateUser {
    constructor(
        private iuser: IUser,
        private itokenProvider: ITokenProvider,
        private ipasswordHasher: IPasswordHasher
    ) { }
    async execute(user: User, clientIP: string,userAgent: string): Promise<{ accessToken: string; refreshToken: string }> {

        const userEmailExists = await this.iuser.findByEmail(user.email);
        const userNameExists = await this.iuser.findByName(user.name);

        if (userEmailExists?.email) throw new Error("Esse email ja esta cadastrado, efetue o login");
        else if (userNameExists?.name) throw new Error("Nome inválido");

        const hashedPassword = await this.ipasswordHasher.hash(user.password);
        user.password = hashedPassword;
        
        const userCreated = await this.iuser.createUser(user);
        if (!userCreated) throw new Error("Usuario não criado");

        const accessToken = await this.itokenProvider.sign({
            id: userCreated.id||'',
            name: userCreated.name,
            ip: clientIP,
            userAgent: userAgent
        });
        const refreshToken = await this.itokenProvider.signRefreshToken({
            id: userCreated.id||'',
            name: userCreated.name,
            ip: clientIP,
            userAgent: userAgent
        });
        return { accessToken: accessToken, refreshToken: refreshToken }
    }
}