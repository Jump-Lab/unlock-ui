import { HTTP_METHODS } from "constant";

export type RequestParams = {
  url: string;
  method: HTTP_METHODS;
  data?: any;
  headers?: any;
};
