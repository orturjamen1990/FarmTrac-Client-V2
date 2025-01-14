import axios from "@/api/axios";
import { ProduceRes, ProduceSizesRes, ProduceSpeciesRes } from "../types";
import { AxiosResponseWrapper } from "@/types/global";

function getProduces(): AxiosResponseWrapper<ProduceRes[]> {
  const url = "/Produce/all";
  return axios.get(url);
}

function getProduceSpecies(
  id: number
): AxiosResponseWrapper<ProduceSpeciesRes> {
  const url = `/Produce/${id}/species`;
  return axios.get(url);
}

function getProduceSizes(id: number): AxiosResponseWrapper<ProduceSizesRes> {
  const url = `/Produce/${id}/sizes`;
  return axios.get(url);
}

function getProduceById(id: number): AxiosResponseWrapper<ProduceRes> {
  const url = `/Produce/${id}`;
  return axios.get(url);
}

function deleteProduce(id: number) {
  const url = `/Produce/${id}`;
  return axios.delete(url);
}

function updateProduce(id: number, request: any) {
  const url = `/Produce/${id}`;
  return axios.put(url, request);
}

function createProduce(request: any) {
  const url = `/Produce/add`;
  return axios.post(url, request);
}

function updateProduceSize(id: number, request: any) {
  const url = `/Produce/sizes/${id}`;
  return axios.put(url, request);
}

function createProduceSize(request: any) {
  const url = `/Produce/sizes`;
  return axios.post(url, request);
}

function deleteProduceSize(id: number) {
  const url = `/Produce/sizes/${id}`;
  return axios.delete(url);
}

function updateProduceSpecies(id: number, request: any) {
  const url = `/Produce/species/${id}`;
  return axios.put(url, request);
}

function createProduceSpecies(request: any) {
  const url = `/Produce/species`;
  return axios.post(url, request);
}

function deleteProduceSpecies(id: number) {
  const url = `/Produce/species/${id}`;
  return axios.delete(url);
}

export default {
  getProduces,
  getProduceById,
  getProduceSpecies,
  getProduceSizes,
  deleteProduce,
  createProduce,
  updateProduce,
  updateProduceSize,
  createProduceSize,
  deleteProduceSize,
  updateProduceSpecies,
  createProduceSpecies,
  deleteProduceSpecies,
};
