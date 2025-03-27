import { IRestaurant, IUser } from "../interfaces/index";
import { Restaurant, User } from "../entities/index";
import { ErrorApi } from "../../error/ErrorApi";

export class CreateRestaurant {

    constructor(
        private irestaurant: IRestaurant,
        private iuser: IUser
    ) { }
    async execute(restaurant: Restaurant): Promise<void> {

        const restaurants = await this.irestaurant.findRestaurantByUserID(restaurant.user_id) as Restaurant

        if (restaurants) throw new ErrorApi("Restaurante ja existente",400);
        const userExists = await this.iuser.findById(restaurant.user_id) as User

        if (!userExists) throw new ErrorApi("Usuario não encontrado",404);
        
        await this.irestaurant.createRestaurant(restaurant);
    }
}