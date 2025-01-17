import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import { CreateCustomerReq, CustomerRes, UpdateCustomerReq } from "../types";

const CUSTOMER_RESOURCE = "customers";

function getCustomers(): AxiosResponseWrapper<CustomerRes[]> {
  const url = `/${CUSTOMER_RESOURCE}/all`;
  return axios.get(url);
}

function getCustomerById(id: number): AxiosResponseWrapper<CustomerRes> {
  const url = `/${CUSTOMER_RESOURCE}/${id}`;
  return axios.get(url);
}

function deleteCustomer(id: number): AxiosResponseWrapper<number> {
  const url = `/${CUSTOMER_RESOURCE}/${id}`;
  return axios.delete(url);
}

function updateCustomer(
  id: number,
  request: UpdateCustomerReq
): AxiosResponseWrapper<number> {
  const url = `/${CUSTOMER_RESOURCE}/${id}`;
  return axios.put(url, request);
}

function createCustomer(
  request: CreateCustomerReq
): AxiosResponseWrapper<number> {
  const url = `/${CUSTOMER_RESOURCE}/add`;
  return axios.post(url, request);
}

export default {
  getCustomers,
  getCustomerById,
  deleteCustomer,
  createCustomer,
  updateCustomer,
};
