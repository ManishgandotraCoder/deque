import express from "express";
export const routes = express();

import { bookrouter } from "../router/book.router";
routes.use("/", bookrouter);
