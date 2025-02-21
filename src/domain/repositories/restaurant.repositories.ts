import { Restaurant } from "../entity/restaurant.entity";

export interface IRestaurantRepository {
  createRestaurant(Restaurant: Restaurant): Promise<Restaurant>;
  findUserId(id: string): Promise<Restaurant | null>;
}
