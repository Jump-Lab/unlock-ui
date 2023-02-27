import { Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";

export const getMetaplex = () => {
  const connection = new Connection("https://api.metaplex.solana.com/");
  const mx = Metaplex.make(connection);

  return mx;
};
