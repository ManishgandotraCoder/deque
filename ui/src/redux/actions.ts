import { createAction } from "@reduxjs/toolkit";
import { BookInterface, StateInterface } from "./types";
import { adminTypes } from "./actionTypes";

export const getBooksRequest = createAction<BookInterface>(
  adminTypes.GET_BOOKS_REQUEST
);
export const getBooksSuccess = createAction<StateInterface>(
  adminTypes.GET_BOOKS_SUCCESS
);
export const getBooksFailure = createAction<string>(
  adminTypes.GET_BOOKS_FAILURE
);
