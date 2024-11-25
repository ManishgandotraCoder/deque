import { Response, Request, NextFunction } from "express";
import axios from "axios";
const apiKey = "";
const processBooksData = (books: any[]) => {
  // Extract authors and publication dates
  const authors: Record<string, number> = {};
  let earliestDate: string | null = null;
  let latestDate: string | null = null;

  books.forEach((book) => {
    const volumeInfo = book.volumeInfo;

    // Track authors
    if (volumeInfo.authors) {
      volumeInfo.authors.forEach((author: string) => {
        authors[author] = (authors[author] || 0) + 1;
      });
    }

    // Track publication dates
    if (volumeInfo.publishedDate) {
      const pubDate = new Date(volumeInfo.publishedDate);
      if (!earliestDate || pubDate < new Date(earliestDate)) {
        earliestDate = volumeInfo.publishedDate;
      }
      if (!latestDate || pubDate > new Date(latestDate)) {
        latestDate = volumeInfo.publishedDate;
      }
    }
  });

  // Find the most common author
  const mostCommonAuthor = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );

  return { mostCommonAuthor, earliestDate, latestDate };
};

export class BookController {
  async getBooks(req: Request, res: Response, next: NextFunction) {
    const maxResults = req.query.maxResults || 10;
    const startIndex = req.query.startIndex || 0;
    const p = req.query || 0;

    const query = p || "search"; // Default query
    const googleBooksAPI = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&maxResults=${maxResults}&startIndex=${startIndex}&q=${query.p}`;

    const startTime = Date.now(); // Track server start time

    try {
      const response = await axios.get(googleBooksAPI);
      const endTime = Date.now(); // Track server end time
      const serverResponseTime = endTime - startTime;

      if (response.data && response.data.items) {
        const { mostCommonAuthor, earliestDate, latestDate } = processBooksData(
          response.data.items
        );

        res.status(200).json({
          error: false,
          totalItems: response.data.totalItems || 0,
          books: response.data.items,
          mostCommonAuthor,
          earliestDate,
          latestDate,
          serverResponseTime: `${serverResponseTime}ms`,
        });
      } else {
        res.status(404).json({
          error: true,
          message: "No books found for the given query.",
        });
      }
    } catch (error: any) {
      if (error.response) {
        res.status(error.response.status).json({
          error: true,
          message: error.response.data.error.message || "Google API error.",
          statusCode: error.response.status,
        });
      } else if (error.request) {
        res.status(503).json({
          error: true,
          message: "Unable to reach Google Books API. Please try again later.",
        });
      } else {
        res.status(500).json({
          error: true,
          message: "An unexpected error occurred.",
        });
      }
    }
  }
}
