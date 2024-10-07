import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Coin,
  CoinData,
  CryptoDataPoint,
  FormValues,
} from "../../../lib/interfaces/coins";

export type InitialStateType = {
  coins: Coin[] | null;
  coin: CoinData | null;
  coinHistory: CryptoDataPoint[] | null;
  loading: boolean;
  error: string | null;
  message: string | null;
};
const initialState: InitialStateType = {
  coins: null,
  coin: null,
  coinHistory: null,
  loading: false,
  error: null,
  message: null,
};
const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    addNewHolding: (state, action: PayloadAction<FormValues>) => {
      state.loading = true;
      state.error = null;
    },
    updateHolding: (state, action: PayloadAction<FormValues>) => {
      state.loading = true;
      state.error = null;
    },
    fetchLocalCoins: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoinInfo: (state, action: PayloadAction<{ symbol: string }>) => {
      state.loading = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // local coins
      .addCase("coins/fetchLocalCoins", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        "coins/fetchLocalCoinsSuccess",
        (state, action: PayloadAction<[]> | any) => {
          state.coins = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        "coins/fetchLocalCoinsFailure",
        (state, action: PayloadAction<string> | any) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      //
      .addCase("coins/addNewHolding", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        "coins/addNewHoldingSuccess",
        (state, action: PayloadAction<[]> | any) => {
          state.coins = action.payload;
          state.loading = false;
          state.message = "Added new coin successfully";
        }
      )
      .addCase(
        "coins/addNewHoldingFailure",
        (state, action: PayloadAction<string> | any) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      //
      .addCase("coins/updateHolding", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        "coins/updateHoldingSuccess",
        (state, action: PayloadAction<Coin[]> | any) => {
          state.coins = action.payload;
          state.loading = false;
          state.message = "Updated new coin successfully";
        }
      )
      .addCase(
        "coins/updateHoldingFailure",
        (state, action: PayloadAction<string> | any) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      //
      .addCase("coins/fetchCoinInfo", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        "coins/fetchCoinInfoSuccess",
        (
          state,
          action:
            | PayloadAction<{
                coinInfoData: CoinData;
                coinHistoryData: CryptoDataPoint;
              }>
            | any
        ) => {
          const { coinInfoData, coinHistoryData } = action.payload;
          state.coin = coinInfoData;
          state.coinHistory = coinHistoryData;
          state.loading = false;
        }
      )
      .addCase(
        "coins/fetchCoinInfoFailure",
        (state, action: PayloadAction<string> | any) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export const {
  fetchLocalCoins,
  addNewHolding,
  updateHolding,
  clearError,
  clearMessage,
  fetchCoinInfo,
} = coinsSlice.actions;
export default coinsSlice.reducer;
