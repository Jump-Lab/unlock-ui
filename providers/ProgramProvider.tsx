import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConnectedWallet } from "@saberhq/use-solana";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { nftStorage } from "@metaplex-foundation/js-plugin-nft-storage";
import * as anchor from "@project-serum/anchor";

import idl from "../utils/solcial/solcial-idl.json";

const DEFAULT_CONTEXT = {
  metaplex: null,
  solcialProgram: null,
};

export const ProgramContext = createContext(DEFAULT_CONTEXT);

export function useProgram() {
  return useContext(ProgramContext);
}

export const ProgramProvider = ({ children }) => {
  const connection = new Connection(
    clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER as Cluster),
    {
      commitment: "finalized",
    }
  );
  const wallet = useConnectedWallet();

  const metaplex = useMemo(
    () =>
      Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
          nftStorage({
            token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
          })
        ),
    [connection, wallet]
  );
  const solcialProgram = useMemo(() => {
    const provider = new anchor.AnchorProvider(connection, wallet as any, {});
    const solcial = new anchor.Program(
      idl as anchor.Idl,
      process.env.NEXT_PUBLIC_SOLCIAL_PROGRAM_ID,
      provider
    );
    return solcial;
  }, [connection, wallet]);

  return (
    <ProgramContext.Provider value={{ metaplex, solcialProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};
