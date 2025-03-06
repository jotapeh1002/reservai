import { Restaurant } from "../entities/Restaurant";
import { IRestaurant } from "../interfaces/IRestaurant";

export class FindRestaurantByUserID {
    constructor(private irestaurant: IRestaurant) {}
    async execute(id: string): Promise<Restaurant | null> {
        const restaurants = await this.irestaurant.findRestaurantByUserID(id);
        return restaurants || null
    }
}