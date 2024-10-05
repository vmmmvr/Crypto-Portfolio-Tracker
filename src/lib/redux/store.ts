import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";

// Implement saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the reducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);

export default store;
