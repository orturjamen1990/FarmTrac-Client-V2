import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import { CreateCarrierReq, CarrierRes, UpdateCarrierReq } from "../types";

const Carrier_RESOURCE = "Carriers";

function getCarriers(): AxiosResponseWrapper<CarrierRes[]> {
  const url = `/${Carrier_RESOURCE}/all`;
  return axios.get(url);
}

function getCarrierById(id: number): AxiosResponseWrapper<CarrierRes> {
  const url = `/${Carrier_RESOURCE}/${id}`;
  return axios.get(url);
}

function deleteCarrier(id: number): AxiosResponseWrapper<number> {
  const url = `/${Carrier_RESOURCE}/${id}`;
  return axios.delete(url);
}

function updateCarrier(
  id: number,
  request: UpdateCarrierReq
): AxiosResponseWrapper<number> {
  const url = `/${Carrier_RESOURCE}/${id}`;
  return axios.put(url, request);
}

function createCarrier(
  request: CreateCarrierReq
): AxiosResponseWrapper<number> {
  const url = `/${Carrier_RESOURCE}/add`;
  return axios.post(url, request);
}

export default {
  getCarriers,
  getCarrierById,
  deleteCarrier,
  createCarrier,
  updateCarrier,
};
