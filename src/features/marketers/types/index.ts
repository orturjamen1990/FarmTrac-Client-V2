export interface MarketerRes {
  id: number;
  name: string;
  notes?: string;
  active: boolean;
}

export type UpdateMarketerReq = MarketerRes;
export type CreateMarketerReq = Omit<MarketerRes, "id">;
