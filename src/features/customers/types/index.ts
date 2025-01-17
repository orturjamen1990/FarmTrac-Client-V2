export interface CustomerRes {
  id: number;
  companyName: string;
  contactPhone: string;
  contactEmail: string;
  address?: string | null;
  active: boolean;
  notes?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  customerType: any;
}

type CustomerReq = {
  id: number;
  companyName: string;
  contactPhone: string;
  contactEmail: string;
  address?: string | null;
  active: boolean;
  notes?: string | null;
  customerTypeId: number;
};

export type UpdateCustomerReq = CustomerReq;
export type CreateCustomerReq = Omit<CustomerReq, "id">;
