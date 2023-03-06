import { useEffect, useState } from "react";
import { Nft, NftWithToken, Sft } from "@metaplex-foundation/js";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useSelector, useDispatch } from "react-redux";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";

import { hideCreatePostModal } from "redux/counterSlice";
import { getMetaplex } from "utils/metaplex";

interface IProps {}

const CreatePostModal: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { createPostModal } = useSelector((state: any) => state.counter);
  return (
    <div>
      <div className={createPostModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog w-2/3 h-screen">
          <div className="modal-content h-[inherit]">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Change Avatar
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(hideCreatePostModal())}
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
            <div className="modal-body p-6"></div>
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
export default CreatePostModal;
