import axios from "@/api/axios";
import { GrowingAreaRes, GrowingAreaTreatmentsRes } from "../types";
import { AxiosResponseWrapper } from "@/types/global";

function getGrowingAreas(): AxiosResponseWrapper<GrowingAreaRes[]> {
  const url = "/growingAreas/all";
  return axios.get(url);
}

function getGrowingAreaById(id: number): AxiosResponseWrapper<GrowingAreaRes> {
  const url = `/GrowingAreas/${id}`;
  return axios.get(url);
}

function getGrowingAreaTreatments(
  id: number
): AxiosResponseWrapper<GrowingAreaTreatmentsRes> {
  const url = `/GrowingAreas/${id}/treatments`;
  return axios.get(url);
}

function deleteGrowingArea(id: number) {
  const url = `/GrowingAreas/${id}`;
  return axios.delete(url);
}

function updateGrowingArea(id: number, request: any) {
  const url = `/GrowingAreas/${id}`;
  return axios.put(url, request);
}

function createGrowingArea(request: any) {
  const url = `/GrowingAreas/add`;
  return axios.post(url, request);
}

function deleteGrowingAreaTreatment(id: number) {
  const url = `/GrowingAreas/treatments/${id}`;
  return axios.delete(url);
}

function updateGrowingAreaTreatment(id: number, request: any) {
  const url = `/GrowingAreas/treatments/${id}`;
  return axios.put(url, request);
}

function createGrowingAreaTreatment(request: any) {
  const url = `/GrowingAreas/treatments/add`;
  return axios.post(url, request);
}

function getGrowingAreaTreatmentById(id: number) {
  const url = `/GrowingAreas/treatments/${id}`;
  return axios.get(url);
}

export default {
  getGrowingAreas,
  getGrowingAreaById,
  deleteGrowingArea,
  updateGrowingArea,
  createGrowingArea,
  getGrowingAreaTreatments,
  deleteGrowingAreaTreatment,
  updateGrowingAreaTreatment,
  createGrowingAreaTreatment,
  getGrowingAreaTreatmentById,
};
