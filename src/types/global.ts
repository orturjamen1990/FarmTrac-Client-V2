import { AxiosResponse } from "axios";
export interface ResponseWrapper<T> {
  data: T;
  isSuccessful: boolean;
  messages: string[];
}

export interface ServerResponse {
  isSuccessful: boolean;
  messages: string[];
}

export type AxiosResponseWrapper<T> = Promise<
  AxiosResponse<ResponseWrapper<T>>
>;
