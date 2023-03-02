import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import Header from "./header";
import ChangeAvatarModal from "./modal/ChangeAvatarModal";

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <ChangeAvatarModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}
