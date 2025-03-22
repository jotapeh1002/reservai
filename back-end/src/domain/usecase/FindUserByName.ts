import { User } from "../entities/index";
import { IUser } from "../interfaces/index";

export class FindByName {
    constructor(private iuser: IUser) { }
    async execute(name: string): Promise<User | null> {
        const user = await this.iuser.findByName(name);
        return user || null
    }
}