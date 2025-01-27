import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import { UpdateUserRequest, User } from "../types";

const RESOURCE = "users";

function getUserById(id: number): AxiosResponseWrapper<User> {
  const url = `/${RESOURCE}/${id}`;
  return axios.get(url);
}

function updateUser(
  id: number,
  request: UpdateUserRequest
): AxiosResponseWrapper<number> {
  const url = `/${RESOURCE}/${id}`;
  return axios.put(url, request);
}

export default {
  getUserById,
  updateUser,
};
