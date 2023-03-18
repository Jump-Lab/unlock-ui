import { useSelector } from "react-redux";
import Footer from "./footer";
import Header from "./header";
import BidsModal from "./modals/bidsModal";
import BuyModal from "./modals/buyModal";
import ChangeAvatarModal from "./modals/ChangeAvatarModal";
import CreateCommunityModal from "./modals/CreateCommunityModal";
import CreatePostModal from "./modals/CreatePostModal";
import Wallet_modal from "./modals/wallet_modal";

export default function Layout({ children }) {
  const { showCreatePostModal, showCreateCommunityModal } = useSelector(
    (state: any) => state.counter
  );
  return (
    <>
      <Header />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <ChangeAvatarModal />
      {showCreatePostModal && <CreatePostModal />}
      {showCreateCommunityModal && <CreateCommunityModal />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
