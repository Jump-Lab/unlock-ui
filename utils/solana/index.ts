import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";

export const connection = new Connection(
  clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER as Cluster),
  {
    commitment: "finalized",
  }
);
