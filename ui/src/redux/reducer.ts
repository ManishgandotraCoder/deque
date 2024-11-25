import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { getBooksFailure, getBooksRequest, getBooksSuccess } from "./actions";
import { StateInterface } from "./types";

const initialState: StateInterface = {
  loading: false,
  totalItems: 0,
  books: [],
  mostCommonAuthor: "",
  earliestDate: "",
  latestDate: "",
  serverResponseTime: "0",
};

const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getBooksRequest, (state) => {
      state.loading = true;
    })
    .addCase(getBooksSuccess, (state, action) => {
      state.loading = false;
      state.totalItems = action.payload.totalItems;
      state.books = action.payload.books;
      state.mostCommonAuthor = action.payload.mostCommonAuthor;
      state.earliestDate = action.payload.earliestDate;
      state.latestDate = action.payload.latestDate;
      state.serverResponseTime = action.payload.serverResponseTime;
    })
    .addCase(getBooksFailure, (state, action) => {
      state.loading = false;
    });
});

export default bookReducer;
