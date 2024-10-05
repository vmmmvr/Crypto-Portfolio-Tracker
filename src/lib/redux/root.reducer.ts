import { combineReducers } from "redux";
import { coinsSlice } from "../../Features/Coins/redux";

// All reducers will be combined here
const rootReducer = combineReducers({
  coins: coinsSlice,
});

export default rootReducer;
