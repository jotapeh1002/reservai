import { Restaurant } from "../entities/index";
import { IRestaurant } from "../interfaces/index";

export class FindRestaurantByUserID {
    constructor(private irestaurant: IRestaurant) {}
    async execute(userId: string): Promise<Restaurant | null> {
        const restaurants = await this.irestaurant.findRestaurantByUserID(userId);
        return restaurants || null
    }
}