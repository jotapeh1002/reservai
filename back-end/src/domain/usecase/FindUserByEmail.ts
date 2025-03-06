import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";

export class FindByEmail {
    constructor(private iuser: IUser) { }
    async execute(email: string): Promise<User | null> {
        const user = await this.iuser.findByEmail(email);
        return user || null
    }
}