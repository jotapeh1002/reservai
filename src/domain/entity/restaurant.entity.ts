export class Restaurant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: string[],
    public readonly address: string,
    public readonly openDays: string[],
    public readonly openTime: string,
    public readonly closeTime: string,
    public readonly culinaryType: string,
    public readonly payMethod: string[],
    public readonly colsedDays?: string[],
    public readonly photo?: string,
    public readonly phone?: string,
    public readonly description?: string,
  ) {}
}
