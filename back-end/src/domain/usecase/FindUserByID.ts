import { User } from "../entities/index";
import { IUser } from "../interfaces/index";

export class FindByID {
    constructor(private iuser: IUser) { }
    async execute(id: string): Promise<User | null> {
        const user = await this.iuser.findById(id);
        return user || null
    }
}