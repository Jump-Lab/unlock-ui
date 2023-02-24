import React from "react";
import { WalletKitProvider } from "@gokiprotocol/walletkit";

export const WalletProviders = ({ children, pageProps }: any) => {
  return (
    <WalletKitProvider
      defaultNetwork="mainnet-beta"
      app={{
        name: "wallet",
      }}
    >
      {children}
    </WalletKitProvider>
  );
};
