import { useEffect, useState } from "react";
import { Nft, NftWithToken, Sft } from "@metaplex-foundation/js";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useSelector, useDispatch } from "react-redux";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";

import { hideCreatePostModal } from "redux/counterSlice";
import { getMetaplex } from "utils/metaplex";
import myImageLoader from "utils/loader";

interface IProps {}

interface RenderImageProps {
  type?: "image" | "create";
}

const RenderImage: React.FC<RenderImageProps> = ({ type }) => {
  if (type === "image")
    return (
      <div className="relative group w-[214px] h-[120px] rounded-large overflow-hidden">
        <Image
          src="./images/blog/post_1.jpg"
          fill
          alt="image"
          loader={myImageLoader}
        />
        <div className="bg-jacarta-900/60 top-0 left-0 right-0 bottom-0 absolute flex items-center justify-center group-hover:opacity-100 opacity-0 group-hover:z-10 z-0 duration-100 transition-opacity">
          <button className="flex items-center gap-x-2 bg-accent-dark rounded-7x px-4 py-3">
            <Image
              src="./images/edit.svg"
              width={24}
              height={24}
              alt="edit_icon"
              className="rounded-large"
              loader={myImageLoader}
            />
            <span>Edit</span>
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-[214px] h-[120px] rounded-large bg-jacarta-800 border border-dashed border-jacarta-600 font-body flex items-center justify-center cursor-pointer">
      <div className="flex items-center gap-x-4">
        <Image
          src="./images/plus.svg"
          width={24}
          height={24}
          alt="plus"
          loader={myImageLoader}
        />
        <p className="text-base font-bold text-jacarta-300">Add new</p>
      </div>
    </div>
  );
};

const CreatePostModal: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { createPostModal } = useSelector((state: any) => state.counter);
  return (
    <div className="">
      <div className={createPostModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog w-1/2 ">
          <div className="modal-content h-[inherit] p-10">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Create Post
              </h5>
              <button
                type="button"
                className="btn-close bg-jacarta-600 p-4 rounded-full"
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
            <div className="modal-body p-6">
              <div className="flex items-center gap-x-3">
                <Image
                  src="./images/avatars/frame_2.png"
                  width={64}
                  height={64}
                  className="rounded-full"
                  alt="avatar"
                  loader={myImageLoader}
                />
                <div>
                  <p className="text-jacarta-100 text-lg leading-6 font-semibold mb-3">
                    Ha Huyen Chi
                  </p>
                  <select
                    name="cars"
                    id="cars"
                    className="text-black text-left text-jacarta-200 px-4 py-[2px] bg-jacarta-600 border border-jacarta-600 rounded-lg font-body text-2xs"
                  >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                  </select>
                </div>
              </div>
              {/* contenteditable */}
              <div
                contentEditable
                className="mt-6 text-jacarta-200 text-lg leading-6 font-semibold focus:outline-none h-60"
              >
                <p className="text-jacarta-500 text-lg leading-6">
                  What&apos;s on your mind?
                </p>
              </div>
              <div className="flex gap-x-3 mb-6">
                <RenderImage type="image" />
                <RenderImage />
                <RenderImage />
              </div>
              <button
                type="button"
                className=" bg-jacarta-600 p-4 rounded-full mb-6"
              >
                <Image
                  src="./images/plus.svg"
                  width={24}
                  height={24}
                  alt="plus"
                  loader={myImageLoader}
                />
              </button>
              <div className="p-7 rounded-4x bg-jacarta-800 flex items-center gap-x-6">
                <div className="flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src="./images/add_image_fill.svg"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="add_image"
                    loader={myImageLoader}
                  />
                  <p className="text-base leading-6 text-jacarta-100">
                    Add Images
                  </p>
                </div>
                <div className="flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src="./images/record_fill.svg"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="record"
                    loader={myImageLoader}
                  />
                  <p className="text-base leading-6 text-jacarta-100">
                    Add a Video
                  </p>
                </div>
                <div className="flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src="./images/checkin_fill.svg"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="checkin"
                    loader={myImageLoader}
                  />
                  <p className="text-base leading-6 text-jacarta-100">
                    Share your position
                  </p>
                </div>
                <div className="flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src="./images/emoticon.svg"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="emoticon"
                    loader={myImageLoader}
                  />
                  <p className="text-base leading-6 text-jacarta-100">
                    Share your emotions
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-end w-full space-x-4">
                <button className="px-8 py-3 rounded-25x shadow-accent-volume bg-accent font-body">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;
