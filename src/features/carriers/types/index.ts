export interface CarrierRes {
  id: number;
  name: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  notes?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarrierReq {
  id: number;
  name: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  notes?: string;
  active: boolean;
}

export type UpdateCarrierReq = CarrierReq;
export type CreateCarrierReq = Omit<CarrierReq, "id">;
