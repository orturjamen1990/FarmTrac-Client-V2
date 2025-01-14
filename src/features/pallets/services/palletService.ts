import axios from "@/api/axios";
import { PalletRes } from "../types";
import { AxiosResponseWrapper } from "@/types/global";

const resource = "pallets";

function getPallets(): AxiosResponseWrapper<PalletRes[]> {
  const url = `/${resource}/all`;
  return axios.get(url);
}

function getPalletById(id: number): AxiosResponseWrapper<PalletRes> {
  const url = `/${resource}/${id}`;
  return axios.get(url);
}

function deletePallet(id: number) {
  const url = `/${resource}/${id}`;
  return axios.delete(url);
}

function updatePallet(id: number, request: any) {
  const url = `/${resource}/${id}`;
  return axios.put(url, request);
}

function createPallet(request: any) {
  const url = `/${resource}/add`;
  return axios.post(url, request);
}

export default {
  getPallets,
  getPalletById,
  deletePallet,
  createPallet,
  updatePallet,
};
