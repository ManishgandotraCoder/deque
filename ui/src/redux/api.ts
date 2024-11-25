// import { helper_axios } from "../helper/axios";
import { helper_axios } from "../helper/axios";
import { BookInterface } from "./types";
// localhost:2000/api/books?ap=search
export const getBooksApi = async (user: BookInterface) => {
  const output = await helper_axios("books", "GET", null, user);
  return output;
};
