import axios, { AxiosResponse } from "axios";
import { FetchCoinsApiRespose } from "../interfaces/coins";

// API call to fetch coins
export function fetchCoinsHttpRequest(): Promise<
  AxiosResponse<FetchCoinsApiRespose>
> {
  return axios.get(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=e5e96ffb80f73ade4b92ffc57f24bf23fd99c9480938c12adb70fb5b2f5756c1"
  ); // Replace with actual API
}
