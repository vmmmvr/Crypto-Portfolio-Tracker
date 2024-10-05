import { createSlice } from "@reduxjs/toolkit";

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    coins: null,
    selectedCoin: null,
    loading: false,
    error: null,
  },
  reducers: { fetchCoinsRequest: (state) => {} },
  extraReducers: (builder) => {
    builder
      .addCase("coins/fetchCoinsRequest", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("coins/fetchCoinsSuccess", (state, action) => {
        state.coins = action.payload;

        state.loading = false;
      })
      .addCase("coins/fetchCoinsFailure", (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { fetchCoinsRequest } = coinsSlice.actions;
export default coinsSlice.reducer;
