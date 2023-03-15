import { SolRpcConditions } from "utils/lit";

export type SolcialPostMetadata = {
  name: string;
  description: string;
  collectionAddress: string;
  encryptedSymmetricKey?: string;
  solRpcConditions?: SolRpcConditions[];
  file?: File;
};

export type SolcialCommunityMetadata = {
  name: string;
  description?: string;
  file?: FileList;
};
