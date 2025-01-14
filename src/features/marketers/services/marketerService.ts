import axios from "@/api/axios";
import { AxiosResponseWrapper } from "@/types/global";
import { CreateMarketerReq, MarketerRes, UpdateMarketerReq } from "../types";

const MARKETER_RESOURCE = "marketers";

function getMarketers(): AxiosResponseWrapper<MarketerRes[]> {
  const url = `/${MARKETER_RESOURCE}/all`;
  return axios.get(url);
}

function getMarketerById(id: number): AxiosResponseWrapper<MarketerRes> {
  const url = `/${MARKETER_RESOURCE}/${id}`;
  return axios.get(url);
}

function deleteMarketer(id: number): AxiosResponseWrapper<number> {
  const url = `/${MARKETER_RESOURCE}/${id}`;
  return axios.delete(url);
}

function updateMarketer(
  id: number,
  request: UpdateMarketerReq
): AxiosResponseWrapper<number> {
  const url = `/${MARKETER_RESOURCE}/${id}`;
  return axios.put(url, request);
}

function createMarketer(
  request: CreateMarketerReq
): AxiosResponseWrapper<number> {
  const url = `/${MARKETER_RESOURCE}/add`;
  return axios.post(url, request);
}

export default {
  getMarketers,
  getMarketerById,
  deleteMarketer,
  createMarketer,
  updateMarketer,
};
