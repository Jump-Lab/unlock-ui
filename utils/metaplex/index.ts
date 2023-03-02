import { Metaplex } from "@metaplex-foundation/js";
import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { nftStorage } from "@metaplex-foundation/js-plugin-nft-storage";

export const getMetaplex = () => {
  const connection = new Connection(
    clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER as Cluster),
    {
      commitment: "finalized",
    }
  );
  const mx = new Metaplex(connection).use(
    nftStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
    })
  );

  return mx;
};
