import axios from "@/api/axios";
import {
  CreateCustomerTypeReq,
  CustomerTypeRes,
  UpdateCustomerTypeReq,
} from "../types/types";
import { AxiosResponseWrapper } from "@/types/global";

const CUSTOMER_TYPE_RESOURCE = "customer-types";

function getCustomerTypes(): AxiosResponseWrapper<CustomerTypeRes[]> {
  const url = `/${CUSTOMER_TYPE_RESOURCE}/all`;
  return axios.get(url);
}

function getCustomerTypeById(
  id: number
): AxiosResponseWrapper<CustomerTypeRes> {
  const url = `/${CUSTOMER_TYPE_RESOURCE}/${id}`;
  return axios.get(url);
}

function deleteCustomerType(id: number) {
  const url = `/${CUSTOMER_TYPE_RESOURCE}/${id}`;
  return axios.delete(url);
}

function updateCustomerType(id: number, request: UpdateCustomerTypeReq) {
  const url = `/${CUSTOMER_TYPE_RESOURCE}/${id}`;
  return axios.put(url, request);
}

function createCustomerType(request: CreateCustomerTypeReq) {
  const url = `/${CUSTOMER_TYPE_RESOURCE}/add`;
  return axios.post(url, request);
}

export default {
  getCustomerTypes,
  getCustomerTypeById,
  deleteCustomerType,
  createCustomerType,
  updateCustomerType,
};
