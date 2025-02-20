interface IFavorite {
  restaurant_id: string;
}

interface IReserve {
  restaurant_id: string;
  table_id: string;
  dateReserve: Date;
}

class UserClient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly favorites: IFavorite[] = [],
    public readonly reserves: IReserve[] = [],
    public readonly password: string,
    public readonly phone?: string,
    public readonly photo?: string,
  ) {}
}
