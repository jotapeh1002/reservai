import { IRestaurant } from "../interfaces/IRestaurant";
import { Restaurant } from "../entities/Restaurant";
import { IUser } from "../interfaces/IUser";
import { User } from "../entities/User";

export class CreateRestaurant {

    constructor(
        private irestaurant: IRestaurant,
        private iuser: IUser
    ) { }
    async execute(restaurant: Restaurant): Promise<void> {

        const restaurants = await this.irestaurant.findRestaurantByUserID(restaurant.user_id) as Restaurant

        if (restaurants) throw new Error("Restaurante ja existente");
        const userExists = await this.iuser.findById(restaurant.user_id) as User

        if (!userExists) throw new Error("Usuario não encontrado");
        
        await this.irestaurant.createRestaurant(restaurant);
    }
}