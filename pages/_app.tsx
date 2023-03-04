import { useRef } from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "redux/store";
// TODO: remove metamask
import { MetaMaskProvider } from "metamask-react";

import Layout from "components/layout";
import Meta from "components/Meta";
import UserContext from "components/UserContext";
import { ProgramProvider, WalletProviders } from "providers";

import "tippy.js/dist/tippy.css";
import "../styles/globals.css";
import { UserProvider } from "providers/UserProvider";

function MyApp({ Component, pageProps }) {
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <WalletProviders>
      <Meta title="Home" />
      <MetaMaskProvider>
        <ProgramProvider>
          <UserProvider>
            <Provider store={store}>
              <ThemeProvider enableSystem={true} attribute="class">
                <UserContext.Provider value={{ scrollRef: scrollRef }}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </UserContext.Provider>
              </ThemeProvider>
            </Provider>
          </UserProvider>
        </ProgramProvider>
      </MetaMaskProvider>
    </WalletProviders>
  );
}

export default MyApp;
