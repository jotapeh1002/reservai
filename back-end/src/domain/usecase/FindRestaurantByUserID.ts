import { Restaurant } from "../entities/Restaurant";
import { IRestaurant } from "../interfaces/IRestaurant";

export class FindRestaurantByUserID {
    constructor(private irestaurant: IRestaurant) {}
    async execute(userId: string): Promise<Restaurant | null> {
        const restaurants = await this.irestaurant.findRestaurantByUserID(userId);
        return restaurants || null
    }
}