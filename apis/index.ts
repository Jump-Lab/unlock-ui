import axios, { AxiosRequestConfig } from "axios";
import { HTTP_METHODS } from "constant";
import { RequestParams } from "types";

const baseURL = process.env.NEXT_PUBLIC_UNLOCK_SERVER_URL;

export async function httpRequest(requestObject: RequestParams) {
  try {
    const {
      url,
      method = HTTP_METHODS.GET,
      headers = {},
      data = {},
    } = requestObject;

    const apiHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };
    const options: AxiosRequestConfig = {
      method,
      url: baseURL + url,
      headers: apiHeaders,
    };
    console.log("Log ~ file: index.ts:19 ~ options:", options);

    if (method === "GET") {
      if (data) options.params = data;
    } else {
      if (data) options.data = data;
    }

    const response = await axios(options);
    return response.data;
  } catch (e) {
    console.log("Log ~ file: index.ts:35 ~ e:", e);
    return null;
  }
}
