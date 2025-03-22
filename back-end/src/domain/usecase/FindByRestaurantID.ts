import { Restaurant } from "../entities/index";
import { IRestaurant } from "../interfaces/index";

export class FindRestaurantByID {
    constructor(private irestaurant: IRestaurant) { }

    async execute(id: string): Promise<Restaurant | null> {
        const restaurants = await this.irestaurant.findRestaurantById(id);
        return restaurants || null
    }
}