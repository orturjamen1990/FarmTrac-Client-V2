export interface GrowerRes {
  id: number;
  name: string;
  email: string;
  establishedYear: Date;
  active: boolean;
  location: string;
  notes: string;
  contactNumber: string;
  pallets: unknown;
}

export interface GrowerReq {
  id?: number;
  name: string;
  email: string;
  establishedYear?: Date;
  active?: boolean;
  location?: string;
  notes?: string;
  contactNumber: string;
}
