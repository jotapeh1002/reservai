import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";

export class FindByName {
    constructor(private iuser: IUser) { }
    async execute(name: string): Promise<User | null> {
        const user = await this.iuser.findByName(name);
        return user || null
    }
}