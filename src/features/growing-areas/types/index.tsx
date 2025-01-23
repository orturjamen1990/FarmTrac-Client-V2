export interface GrowingAreaRes {
  id: number;
  name: string;
  location: string;
  size: number;
  soilType: string;
  climate: string;
  irrigationType: string;
  notes: string;
  produce: string;
}

export interface GrowingAreaReq {
  id?: number;
  name: string;
  location: string;
  size?: number;
  soilType: string;
  climate: string;
  irrigationType: string;
  notes?: string;
  produceId?: number;
}

export type TreatmentsRes = {
  treatmentId: number;
  date: Date;
  chemical: string;
  purpose: string;
};

export type GrowingAreaTreatmentsRes = {
  growingAreaId: number;
  growingAreaName: string;
  treatments: TreatmentsRes[];
};
