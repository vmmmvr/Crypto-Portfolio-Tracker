export interface Coin {
  id: number;
  name: string;
  symbol: string;
  quantity: number;
  total: number;
  price: number;
}

export interface CryptoData {
  Message?: string;
  Type?: number;
  Data?: CoinData[];
  RateLimit?: Record<string, unknown>;
  HasWarning?: boolean;
}

export interface CoinData {
  CoinInfo?: {
    Id?: string;
    Name?: string;
    FullName?: string;
    Internal?: string;
    ImageUrl?: string;
    Url?: string;
    Algorithm?: string;
    ProofType?: string;

    AssetLaunchDate?: string;
  };
  ConversionInfo?: {
    CurrencyFrom?: string;
    CurrencyTo?: string;
    Market?: string;
    Supply?: number;
    TotalVolume24H?: number;
    TotalTopTierVolume24H?: number;
  };
}

export interface CryptoDataPoint {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export interface FormValues {
  id?: number;
  name: string;
  symbol: string;
  quantity: number;
}
