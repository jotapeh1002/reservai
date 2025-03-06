import { Restaurant } from "../entities/Restaurant";
import { IRestaurant } from "../interfaces/IRestaurant";

export class GetAllRestaurant {
    constructor(private irestaurant: IRestaurant) { }
    async execute( page: number = 1, limit: number = 10): Promise<{ data: Restaurant[], total: number } | null> {
        const offset = limit === Infinity ? 0 : (page - 1) * limit;
        const restaurants = await this.irestaurant.getAllRestaurant(offset,limit);
        return restaurants || null
    }
}