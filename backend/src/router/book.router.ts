import express from "express";

export const bookrouter = express.Router();
import * as controller from "../controllers/main-controller";
import * as middleware from "../middlewares";
bookrouter.get(
  "/books/",
  middleware.data.rules.validateGetBooksParams,
  controller.book.getBooks
);
