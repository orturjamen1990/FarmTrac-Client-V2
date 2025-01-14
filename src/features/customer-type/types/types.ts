export type CustomerTypeRes = {
  id: number;
  name: string;
  notes: string | null;
};

export type CreateCustomerTypeReq = Omit<CustomerTypeRes, "id">;
export type UpdateCustomerTypeReq = CustomerTypeRes;
