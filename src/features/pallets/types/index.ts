import { PalletTypeRes } from "@/features/pallet-types/types";
import { ProduceRes, ProduceSizes, SpeciesRes } from "@/features/produce/types";

export type PalletRes = {
  id: number;
  externalNumber?: string;
  packagingCount: number;
  netWeight: number;
  produceId?: number;
  produceSizeId?: number | undefined;
  speciesId?: number | undefined;
  growerId?: number | undefined;
  palletTypeId?: number;
  localShippingCertificateId?: string;
};

export type PalletsRes = {
  id: number;
  externalNumber?: string;
  packagingCount: number;
  netWeight: number;
  produce?: ProduceRes;
  produceSize?: ProduceSizes;
  species?: SpeciesRes;
  grower?: any;
  palletType: PalletTypeRes;
};

export type CreatePalletReq = Omit<PalletRes, "id">;
export type UpdatePalletReq = PalletRes;
export type PalletReq = Partial<CreatePalletReq | UpdatePalletReq>;
