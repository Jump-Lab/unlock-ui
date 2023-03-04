import { SolRpcConditions } from "utils/lit";

export type SolcialPostMetadata = {
  name: string;
  description: string;
  image: string;
  encryptedSymmetricKey?: string;
  solRpcConditions?: SolRpcConditions[];
  file?: File;
};
