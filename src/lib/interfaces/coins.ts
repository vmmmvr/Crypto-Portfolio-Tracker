export interface Coin {
  id: string;
  name: string;
  price: string;
}

export type Coins = Coin;

export interface FetchCoinsApiRespose {
  data: Coins;
}
