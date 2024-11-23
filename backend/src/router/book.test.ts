import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import * as controller from "../controllers/main-controller";
import * as middleware from "../middlewares";
import { bookrouter } from "./book.router";

describe("GET /books/", () => {
  const app = express();
  app.use(express.json());
  app.use(bookrouter);

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("should return books when parameters are valid", async () => {
    jest
      .spyOn(middleware.data.rules, "validateGetBooksParams")
      .mockImplementation(
        async (req: Request, res: Response, next: NextFunction) => {
          next(); // Middleware passes validation
        }
      );

    jest
      .spyOn(controller.book, "getBooks")
      .mockImplementation(
        async (req: Request, res: Response, next: NextFunction) => {
          res.status(200).json({ books: ["Book 1", "Book 2"] });
        }
      );

    const response = await request(app).get(
      "/books?p=search&maxResults=1&startIndex=0&"
    );

    expect(response.status).toBe(200);
    expect(response.body.totalItems).toBeGreaterThan(0);
  });

  it("should return 400 if parameters are invalid", async () => {
    jest
      .spyOn(middleware.data.rules, "validateGetBooksParams")
      .mockImplementation(
        async (req: Request, res: Response, next: NextFunction) => {
          res.status(400).json({ message: "The p field is mandatory." });
        }
      );

    const response = await request(app).get("/books");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "The p field is mandatory." });

    expect(controller.book.getBooks).not.toHaveBeenCalled();
  });
});
