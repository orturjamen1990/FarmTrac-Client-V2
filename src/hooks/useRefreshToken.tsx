import useAuth from "./useAuth";
import axios from "../api/axios";
import { TokenResponse } from "@/context/AuthProvider";
export const useRefreshToken = () => {
  // const { setAuth }: any = useAuth();
  // const refresh = async () => {
  //   const response = await axios.get("/auth/refresh", {
  //     withCredentials: true,
  //   });
  //   setAuth((prev: TokenResponse) => {
  //     console.log(JSON.stringify(prev));
  //     console.log(response);
  //     return { ...prev, accessToken: response.data.accessToken };
  //   });
  //   return response.data.accessToken;
  // };
};
