import axios, { AxiosResponse } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
// API call to fetch coins
export function fetchCoinsHttpRequest(params: {
  symbol: string;
}): Promise<AxiosResponse<any>> {
  return axios.get(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${params.symbol},&tsyms=USD&api_key=${API_KEY}`
  ); // Replace with actual API
}

// API call to fetch coins
export function fetchCoinInfoHttpRequest(params: {
  symbol: string;
}): Promise<AxiosResponse<any>> {
  return axios.get(
    `https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${params.symbol},&tsym=USD&api_key=${API_KEY}`
  ); // Replace with actual API
}

// API call to fetch coins
export function fetchCoinHistoryDataHttpRequest(params: {
  symbol: string;
}): Promise<AxiosResponse<any>> {
  return axios.get(
    ` https://min-api.cryptocompare.com/data/v2/histoday?fsym=${params.symbol}&tsym=USD&limit=30&api_key=${API_KEY}`
  ); // Replace with actual API
}
