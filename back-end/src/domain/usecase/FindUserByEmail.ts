import { User } from "../entities/index";
import { IUser } from "../interfaces/index";

export class FindByEmail {
    constructor(private iuser: IUser) { }
    async execute(email: string): Promise<User | null> {
        const user = await this.iuser.findByEmail(email);
        return user || null
    }
}