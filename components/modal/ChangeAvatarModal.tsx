import { useConnectedWallet } from "@saberhq/use-solana";
import { useSelector, useDispatch } from "react-redux";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey, Connection } from "@solana/web3.js";
import axios, { AxiosPromise, AxiosResponse } from "axios";

import { hideChangeAvatarModal } from "redux/counterSlice";
import { useEffect, useState } from "react";
import { INFT } from "types/nft";
import Image from "next/image";

const ChangeAvatarModal = () => {
  const dispatch = useDispatch();
  const { changeAvatarModal } = useSelector((state: any) => state.counter);
  const [listNfts, setListNfts] = useState<INFT[]>([]);

  const wallet = useConnectedWallet();
  const userWalletAddress = wallet?.publicKey;

  const getNfts = async (address: PublicKey) => {
    try {
      const connection = new Connection("https://api.metaplex.solana.com/");
      const mx = Metaplex.make(connection);
      const assets = await mx.nfts().findAllByOwner({ owner: address });
      if (assets.length > 0) {
        console.log("asset", assets);
        const listRequest: AxiosPromise<INFT>[] = assets.map((asset) => {
          const { uri } = asset;
          return axios.get(uri);
        });
        const listResponse = await Promise.all(listRequest);
        setListNfts(listResponse.map((res) => res.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userWalletAddress && changeAvatarModal) {
      console.log("connected ", userWalletAddress);
      getNfts(userWalletAddress);
    } else {
      setListNfts([]);
    }
    //delete use-solana/wallet-config in localstorage
  }, [userWalletAddress, changeAvatarModal]);

  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div
        className={changeAvatarModal ? "modal fade show block" : "modal fade"}
      >
        <div className="modal-dialog w-2/3 h-screen">
          <div className="modal-content h-[inherit]">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Change Avatar
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(hideChangeAvatarModal())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              {listNfts.map((i, index) => (
                <Image
                  key={`nft-${index}`}
                  src={i.image}
                  width={100}
                  height={100}
                  alt={`nft-${i.name}`}
                  loader={({ src }) => src}
                />
              ))}
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
