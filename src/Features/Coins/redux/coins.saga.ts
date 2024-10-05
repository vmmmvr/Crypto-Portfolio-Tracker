import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCoinsHttpRequest } from "../../../lib/services";
import { AxiosResponse } from "axios";
import { FetchCoinsApiRespose } from "../../../lib/interfaces/coins";
import { fetchCoinsRequest } from "./coins.slice";

function* fetchLocalCoins() {
  // use axios to get list of data
}
function* fetchHttpCoins() {
  try {
    const response: AxiosResponse<FetchCoinsApiRespose> = yield call(
      fetchCoinsHttpRequest
    );

    yield put({ type: "coins/fetchCoinsSuccess", payload: response.data }); // Success action
  } catch (error: any) {
    yield put({ type: "coins/fetchCoinsFailure", payload: error.message }); // Failure action
  }
}

function* watchCoinsActions() {
  yield takeEvery("coins/fetchLocal", fetchLocalCoins);
  yield takeEvery(fetchCoinsRequest.type, fetchHttpCoins);
}

export default watchCoinsActions;
