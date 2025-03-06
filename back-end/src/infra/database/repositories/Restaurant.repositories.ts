import { Restaurant } from "../../../domain/entities/Restaurant";
import { IRestaurant } from "../../../domain/interfaces/IRestaurant";
import { PrismaClient } from "@prisma/client";

export class RestaurantRepository implements IRestaurant {
    constructor(private prisma: PrismaClient) { }

    async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        return await this.prisma.restaurant.create({
            data: restaurant
        });
    }
    async getAllRestaurant(offset?: number, limiter?: number): Promise<{ data: Restaurant[], total: number } | null> {
        const restaurants = await this.prisma.restaurant.findMany({
            skip: offset,
            take: limiter
        });
        const total = await this.prisma.restaurant.count();
        if (total === 0) return null
        return { data: restaurants, total }
    }
    async findRestaurantById(id: string): Promise<Restaurant | null> {
        const restaurants = await this.prisma.restaurant.findUnique({ where: { id } });
        if (!restaurants) return null;
        return restaurants
    }
    async findRestaurantByUserID(id: string): Promise<Restaurant | null> {
        const restaurants = await this.prisma.restaurant.findUnique({ where: { user_id: id } });
        if (!restaurants) return null;
        return restaurants
    }
}
