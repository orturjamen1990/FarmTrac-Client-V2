import axios from "@/api/axios";
import { PalletTypeRes } from "../types";
import { AxiosResponseWrapper } from "@/types/global";

const resource = "pallet-types";

function getPalletTypes(): AxiosResponseWrapper<PalletTypeRes[]> {
  const url = `/${resource}/all`;
  return axios.get(url);
}

function getPalletTypeById(id: number): AxiosResponseWrapper<PalletTypeRes> {
  const url = `/${resource}/${id}`;
  return axios.get(url);
}

function deletePalletType(id: number) {
  const url = `/${resource}/${id}`;
  return axios.delete(url);
}

function updatePalletType(id: number, request: any) {
  const url = `/${resource}/${id}`;
  return axios.put(url, request);
}

function createPalletType(request: any) {
  const url = `/${resource}/add`;
  return axios.post(url, request);
}

export default {
  getPalletTypes,
  getPalletTypeById,
  deletePalletType,
  createPalletType,
  updatePalletType,
};
