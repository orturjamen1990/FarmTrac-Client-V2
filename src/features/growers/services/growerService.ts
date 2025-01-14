import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import { GrowerReq, GrowerRes } from "../types/types";

function getGrowers(): AxiosResponseWrapper<GrowerRes[]> {
  const url = "/Growers/all";
  return axios.get(url);
}

function getGrowerById(id: number): AxiosResponseWrapper<GrowerRes> {
  const url = `/Growers/${id}`;
  return axios.get(url);
}

function deleteGrower(id: number): AxiosResponseWrapper<number> {
  const url = `/Growers/${id}`;
  return axios.delete(url);
}

function updateGrower(
  id: number,
  request: GrowerReq
): AxiosResponseWrapper<number> {
  const url = `/Growers/${id}`;
  return axios.put(url, request);
}

function createGrower(request: GrowerReq): AxiosResponseWrapper<number> {
  const url = `/Growers/add`;
  return axios.post(url, request);
}

export default {
  getGrowers,
  getGrowerById,
  deleteGrower,
  createGrower,
  updateGrower,
};
