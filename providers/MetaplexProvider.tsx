import { createContext, useContext, useMemo } from "react";
import { useConnection, useConnectedWallet } from "@saberhq/use-solana";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const DEFAULT_CONTEXT = {
  metaplex: null,
};

export const MetaplexContext = createContext(DEFAULT_CONTEXT);

export function useMetaplex() {
  return useContext(MetaplexContext);
}

export const MetaplexProvider = ({ children }) => {
  const connection = useConnection();
  const wallet = useConnectedWallet();

  const metaplex = useMemo(
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );

  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  );
};
