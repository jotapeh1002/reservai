import { Restaurant } from "../entities/Restaurant";

export interface IRestaurant {
  createRestaurant(Restauran: Restaurant): Promise<Restaurant>;
  getAllRestaurant(offset?: number, limit?: number): Promise<{ data: Restaurant[], total: number } | null>;
  findRestaurantById(id: string): Promise<Restaurant | null>;
  findRestaurantByUserID(id: string): Promise<Restaurant | null>;
}
