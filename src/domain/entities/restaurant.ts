export class Restaurant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly address: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
    public readonly openDays: string[],
    public readonly colsedDays: string[],
    public readonly openTime: string,
    public readonly closeTime: string,
    public readonly photo: string,
    public readonly culinaryType: string,
    public readonly description: string,
    public readonly payMethod: string[],
    public readonly createdAt: Date,
    public readonly available: string[],

  ) {}
}
