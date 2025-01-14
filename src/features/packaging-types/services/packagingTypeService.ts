import axios from "@/api/axios";
import {
  CreatePackagingTypeReq,
  PackagingTypeRes,
  UpdatePackagingTypeReq,
} from "../types";
import { AxiosResponseWrapper } from "@/types/global";

const resource = "packagingTypes";

function getPackagingTypes(): AxiosResponseWrapper<PackagingTypeRes[]> {
  const url = `/${resource}/all`;
  return axios.get(url);
}

function getPackagingTypeById(
  id: number
): AxiosResponseWrapper<PackagingTypeRes> {
  const url = `/${resource}/${id}`;
  return axios.get(url);
}

function deletePackagingType(id: number) {
  const url = `/${resource}/${id}`;
  return axios.delete(url);
}

function updatePackagingType(id: number, request: UpdatePackagingTypeReq) {
  const url = `/${resource}/${id}`;
  return axios.put(url, request);
}

function createPackagingType(request: CreatePackagingTypeReq) {
  const url = `/${resource}/add`;
  return axios.post(url, request);
}

export default {
  getPackagingTypes,
  getPackagingTypeById,
  deletePackagingType,
  createPackagingType,
  updatePackagingType,
};
