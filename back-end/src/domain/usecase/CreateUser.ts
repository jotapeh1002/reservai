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

        if (userEmailExists?.email) throw new Error("Email already registered, go to the login page!");
        else if (userNameExists?.name) throw new Error("name not available");

        user.password = await this.ipasswordHasher.hash(user.password);
        const userCreated = await this.iuser.createUser(user);
        if (!userCreated) throw new Error("User not created");

        const token = this.itokenProvider.sign({...userCreated, ip: clientIP});
        return token || null
    }
}