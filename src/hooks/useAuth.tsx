import authApi from "@/api/auth";
import { clearUserInfo } from "@/stores/common-slices/authSlice";
import { store } from "@/stores/store";
import { UseNavigateResult } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { userInfo } from "@/stores/common-slices/authSlice";

export type RouterContext = {
  authentication: AuthContext;
};

export const useAuth = () => {
  const authStore = useSelector(userInfo);

  const logout = async (navigate: UseNavigateResult<string>) => {
    await authApi.logout();
    store.dispatch(clearUserInfo());
    navigate({ to: "/sign-in" });
  };

  const isLogged = () => {
    return authStore.user !== undefined;
  };

  const getLoggedInUserInfo = () => {
    return structuredClone(authStore.user);
  };

  return { logout, isLogged, getLoggedInUserInfo };
};

export type AuthContext = ReturnType<typeof useAuth>;
