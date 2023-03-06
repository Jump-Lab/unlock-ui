import { SolRpcConditions } from "utils/lit";

export type SolcialPostMetadata = {
  description: string;
  encryptedSymmetricKey?: string;
  solRpcConditions?: SolRpcConditions[];
  file?: File;
};
