export type PackagingTypeRes = {
  id: number;
  name: string;
  unitWeight: number | null;
  notes: string | null;
};

export type CreatePackagingTypeReq = Omit<PackagingTypeRes, "id">;
export type UpdatePackagingTypeReq = PackagingTypeRes;
