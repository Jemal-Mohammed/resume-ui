import { all } from 'redux-saga/effects';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice"
import createSagaMiddleware from 'redux-saga';
import userSaga from "./saga/userSaga";
import profileSaga from "./saga/profileSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// sagaMiddleware.run(userSaga,profileSaga);

sagaMiddleware.run(function* rootSaga() {
  yield all([userSaga(), profileSaga()]);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
