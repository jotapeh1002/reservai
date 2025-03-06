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
        const restaurantExists = restaurants?.user_id === restaurant.user_id ? true : false

        if (restaurantExists) throw new Error("Restaurant by user already exists");
        const userExists = await this.iuser.findById(restaurant.user_id) as User

        if (!userExists) throw new Error("User not found");
        await this.irestaurant.createRestaurant(restaurant);
    }
}