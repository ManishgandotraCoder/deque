import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { getBooksApi } from "./api";
import { getBooksFailure, getBooksRequest, getBooksSuccess } from "./actions";
import { BookInterface } from "./types";
function* getBooksSaga(action: PayloadAction<BookInterface>): SagaIterator {
  try {
    const user = yield call(getBooksApi, action.payload);
    yield put(getBooksSuccess(user));
  } catch (error: Error | any) {
    yield put(
      getBooksFailure(
        error?.message ? error.message : "An unknown error occurred"
      )
    );
  }
}
export function* watchgetBooksApiSagas() {
  yield takeLatest(getBooksRequest.type, getBooksSaga);
}
