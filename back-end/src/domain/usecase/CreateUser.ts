import { JwtPayloadDTO } from "../../dtos/TokenDTO";
import { User } from "../entities/User";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { ITokenProvider } from "../interfaces/ITokenProvider";
import { IUser } from "../interfaces/IUser";

export class CreateUser {
    constructor(
        private iuser: IUser,
        private itokenProvider: ITokenProvider,
        private ipasswordHasher: IPasswordHasher
    ) { }
    async execute(user: User, clientIP: string): Promise<string> {

        const userEmailExists = await this.iuser.findByEmail(user.email);
        const userNameExists = await this.iuser.findByName(user.name);

        if (userEmailExists?.email) throw new Error("Esse email ja esta cadastrado, efetue o login");
        else if (userNameExists?.name) throw new Error("Nome inválido");

        user.password = await this.ipasswordHasher.hash(user.password);
        const userCreated = await this.iuser.createUser(user);
        if (!userCreated) throw new Error("Usuario não criado");

        const token = await this.itokenProvider.sign(new JwtPayloadDTO(userCreated.id||'', userCreated.name, clientIP));

        return token
    }
}