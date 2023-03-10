import Footer from "./footer";
import Wallet_modal from "./modals/wallet_modal";
import BidsModal from "./modals/bidsModal";
import BuyModal from "./modals/buyModal";
import Header from "./header";
import ChangeAvatarModal from "./modals/ChangeAvatarModal";
import CreatePostModal from "./modals/CreatePostModal";
import CreateCommunityModal from "./modals/CreateCommunityModal";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <ChangeAvatarModal />
      <CreatePostModal />
      <CreateCommunityModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}
