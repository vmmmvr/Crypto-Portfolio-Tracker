// src/sagas/index.js
import { all } from "redux-saga/effects";
import watchCoinsActions from "../../Features/Coins/redux/coins.saga";

export default function* rootSaga() {
  yield all([watchCoinsActions()]);
}
