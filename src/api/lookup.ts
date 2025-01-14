import { AxiosResponse } from "axios";
import axios from "./axios";
import { AxiosResponseWrapper, ResponseWrapper } from "@/types/global";

let config = {
  headers: {
    tenant: "root",
  },
};

export type LookupValues = {
  value: string | number;
  label: string;
};

type LookUpResponse = Promise<AxiosResponse<ResponseWrapper<LookupValues[]>>>;

function getProducers(): LookUpResponse {
  const url = "/Lookup/produces";
  return axios.get(url);
}

function getProducesWithSpeciesAndSizes(): AxiosResponseWrapper<any> {
  const url = `/Lookup/produces/with-species-and-sizes`;
  return axios.get(url);
}

function getVehicleTypes(): LookUpResponse {
  const url = "/Lookup/vehicleTypes";
  return axios.get(url);
}

function getPalletTypes(): LookUpResponse {
  const url = "/Lookup/pallet-types";
  return axios.get(url);
}

function getCustomers(): LookUpResponse {
  const url = "/Lookup/customers";
  return axios.get(url);
}

function getCustomerTypes(): LookUpResponse {
  const url = "/Lookup/customer-types";
  return axios.get(url);
}

function getMarketers(): LookUpResponse {
  const url = "/Lookup/marketers";
  return axios.get(url);
}

function getCarriers(): LookUpResponse {
  const url = "/Lookup/carriers";
  return axios.get(url);
}

function getShippingCertificateStatus(): LookUpResponse {
  const url = "/Lookup/shipping-certificate-status";
  return axios.get(url);
}

function getShippingCertificateType(): LookUpResponse {
  const url = "/Lookup/shipping-certificate-type";
  return axios.get(url);
}

export default {
  getProducers,
  getVehicleTypes,
  getProducesWithSpeciesAndSizes,
  getPalletTypes,
  getCustomers,
  getCustomerTypes,
  getMarketers,
  getCarriers,
  getShippingCertificateStatus,
  getShippingCertificateType,
};
