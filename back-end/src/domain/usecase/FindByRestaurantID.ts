import { Restaurant } from "../entities/Restaurant";
import { IRestaurant } from "../interfaces/IRestaurant";

export class FindRestaurantByID {
    constructor(private irestaurant: IRestaurant) { }

    async execute(id: string): Promise<Restaurant | null> {
        const restaurants = await this.irestaurant.findRestaurantById(id);
        return restaurants || null
    }
}