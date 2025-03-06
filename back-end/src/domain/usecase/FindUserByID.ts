import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";

export class FindByID {
    constructor(private iuser: IUser) { }
    async execute(id: string): Promise<User | null> {
        const user = await this.iuser.findById(id);
        return user || null
    }
}