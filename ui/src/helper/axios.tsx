import axios, { AxiosError } from "axios";
import { configuration } from "../config";

const url = configuration.BASE_URL;

export const helper_axios = async (
  path: string,
  method: string,
  body: any,
  query: any
) => {
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    path = `${path}?${queryString}`; // Append query string to the path
  }

  const config = {
    method: method,
    url: url + path,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(response.data);
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response?.data);
      } else if (error.request) {
        reject(new Error("No response received from the server."));
      } else {
        reject(new Error(`Error in request setup: ${error.message}`));
      }
    }
  });
};
