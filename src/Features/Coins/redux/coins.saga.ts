import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  addNewHolding,
  fetchCoinInfo,
  fetchLocalCoins,
  updateHolding,
} from "./coins.slice";
import { cacheNewCoins, calculateTotal, getCachedCoins } from "./helpers";
import {
  fetchCoinHistoryDataHttpRequest,
  fetchCoinInfoHttpRequest,
  fetchCoinsHttpRequest,
} from "../../../lib/services/coins.service";
import { CoinData } from "../../../lib/interfaces/coins";

function* fetchLocalCoinsSaga() {
  const { coins } = getCachedCoins();

  yield put({ type: "coins/fetchLocalCoinsSuccess", payload: coins });
}

function* fetchCoinInfoSaga(action: any) {
  try {
    const { payload } = action;
    const response: AxiosResponse<any> = yield call(fetchCoinInfoHttpRequest, {
      symbol: payload.symbol,
    });
    const Historyresponse: AxiosResponse<any> = yield call(
      fetchCoinHistoryDataHttpRequest,
      {
        symbol: payload.symbol,
      }
    );

    if (response.data?.["Response"]) {
      yield put({
        type: "coins/fetchCoinInfoFailure",
        payload: "Sorry, there is no coin with this Symbol",
      });
    } else {
      const coinInforesult: CoinData = response.data?.["Data"][0];
      const coinHistoryresult: CoinData =
        Historyresponse.data?.["Data"]?.["Data"];

      yield put({
        type: "coins/fetchCoinInfoSuccess",
        payload: {
          coinInfoData: coinInforesult,
          coinHistoryData: coinHistoryresult,
        },
      });
    }
  } catch (err: any) {}
}

function handleCacheCoin(
  coins: any[],
  coin: any,
  isUpdate: boolean
): any | false {
  return cacheNewCoins(coins, coin, isUpdate);
}

function* fetchCoinData(
  symbol: string
): Generator<any, AxiosResponse<any>, any> {
  return yield call(fetchCoinsHttpRequest, { symbol });
}

function calculateCoinTotal(price: number, quantity: number) {
  return calculateTotal(price, quantity);
}

function* addNewHoldingSaga(action: any) {
  try {
    const { payload } = action;
    const response: AxiosResponse<any> = yield fetchCoinData(payload.symbol);

    if (response.data?.["Response"]) {
      yield put({
        type: "coins/addNewHoldingFailure",
        payload: "Sorry, there is no coin with this Symbol",
      });
    } else {
      const price = response.data?.[payload.symbol]?.["USD"];
      const { total } = calculateCoinTotal(price, Number(payload.quantity));

      const { coins } = getCachedCoins();
      const result = handleCacheCoin(
        coins,
        {
          id: coins.length + 1,
          name: payload.name,
          symbol: payload.symbol,
          quantity: Number(payload.quantity),
          price,
          total,
        },
        false
      );

      if (result === false) {
        yield put({
          type: "coins/addNewHoldingFailure",
          payload: "This Coin Already Exists",
        });
      } else {
        yield put({ type: "coins/addNewHoldingSuccess", payload: result });
      }
    }
  } catch (error: any) {
    yield put({
      type: "coins/addNewHoldingFailure",
      payload: error,
    });
  }
}

function* updateNewHoldingSaga(action: any) {
  try {
    const { payload } = action;
    const response: AxiosResponse<any> = yield fetchCoinData(payload.symbol);

    if (response.data?.["Response"]) {
      yield put({
        type: "coins/updateHoldingFailure",
        payload: "Sorry, there is no coin with this Symbol",
      });
    } else {
      const price = response.data?.[payload.symbol]?.["USD"];
      const { total } = calculateCoinTotal(price, Number(payload.quantity));

      const { coins } = getCachedCoins();
      const result = handleCacheCoin(
        coins,
        {
          id: payload.id,
          name: payload.name,
          symbol: payload.symbol,
          quantity: Number(payload.quantity),
          price,
          total,
        },
        true
      );

      yield put({ type: "coins/updateHoldingSuccess", payload: result });
    }
  } catch (error: any) {
    yield put({
      type: "coins/updateHoldingFailure",
      payload: error,
    });
  }
}

function* watchCoinsActions() {
  yield takeEvery(fetchLocalCoins.type, fetchLocalCoinsSaga);
  yield takeEvery(fetchCoinInfo.type, fetchCoinInfoSaga);

  yield takeEvery(addNewHolding.type, addNewHoldingSaga);
  yield takeEvery(updateHolding.type, updateNewHoldingSaga);
}

export default watchCoinsActions;
