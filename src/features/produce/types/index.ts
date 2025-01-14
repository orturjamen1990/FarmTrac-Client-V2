export type ProduceRes = {
  id: number;
  name: string;
};

export type ProduceSpeciesRes = {
  produceId: number;
  produceName: string;
  species: SpeciesRes[];
};

export type ProduceSizesRes = {
  produceId: number;
  produceName: string;
  sizes: ProduceSizes[];
};

export type SpeciesRes = {
  id: number;
  name: string;
};

export type ProduceSizes = {
  id: number;
  name: string;
};

export type ProduceSizeReq = {
  id: number;
  size: string;
  produceId: number;
};

export type ProduceSpeciesReq = {
  id: number;
  name: string;
  produceId: number;
};
