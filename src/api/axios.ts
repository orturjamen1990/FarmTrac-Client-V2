import axios, { AxiosError } from "axios";

const baseUrl = `${import.meta.env.VITE_APP_BASE_API}`;
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export default instance;
