import { DaysWeek, PayMethod, PriceRange } from "@prisma/client";

export class Restaurant {
  constructor(
    public readonly name: string,
    public readonly price_range: PriceRange[],
    public readonly address: string,
    public readonly open_days: DaysWeek[],
    public readonly opening_times: string,
    public readonly closing_times: string,
    public readonly culinary_types: string,
    public readonly pay_methods: PayMethod[],
    public readonly user_id: string,
    public readonly close_days?: DaysWeek[],
    public readonly photo?: string | null,
    public readonly phone?: string | null,
    public readonly description?: string | null,
    public readonly id?: string,
  ) { }
}