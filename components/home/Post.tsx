import { useEffect, useState } from "react";
import Image from "next/image";

import { useProgram } from "providers";
import myImageLoader from "utils/loader";
import { PublicKey } from "@solana/web3.js";
import { decrypt } from "utils/lit";

interface IProps {
  address: string;
}

const Post: React.FC<IProps> = ({ address }) => {
  const { metaplex } = useProgram();

  const [nft, setNft] = useState();
  console.log("Log ~ file: Post.tsx:17 ~ nft:", nft)
  const [image, setImage] = useState();

  useEffect(() => {
    const getMetadata = async () => {
      const metadata = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(address) });
      setNft(metadata);
      if (metadata.json.properties) {
        setImage(metadata.json.image);
      }
    };
    getMetadata();
  }, [address, metaplex]);

  useEffect(() => {
    if (image && nft) {
      const decryptImage = async () => {
        const test = await decrypt(image, nft.json.properties);
        console.log("Log ~ file: Post.tsx:37 ~ decryptImage ~ test:", test)
      };
      decryptImage()
    }
  }, [image, nft]);

  return (
    <div className="p-5 bg-jacarta-800 border border-jacarta-600 rounded-5x">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-x-3">
            <Image
              src="./images/avatars/frame_2.png"
              width={48}
              height={48}
              className="rounded-full"
              alt="post_owner"
              loader={myImageLoader}
            />
            <div>
              <p className="text-lg text-jacarta-200 font-semibold mb-1 font-display">
                Author
              </p>
              <div className="flex items-center gap-x-1.5 font-body">
                <Image
                  src="./images/clock.svg"
                  width={16}
                  height={16}
                  alt="clock"
                  loader={myImageLoader}
                />
                <p className="text-2xs text-jacarta-300">12 minutes a go</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <button>
            <Image
              src="./images/bookmark.svg"
              width={16}
              height={16}
              alt="bookmark"
              loader={myImageLoader}
            />
          </button>
          <button>
            <Image
              src="./images/threedot.svg"
              width={5}
              height={5}
              alt="threedot"
              loader={myImageLoader}
            />
          </button>
        </div>
      </div>
      {/* content */}
      <p className="text-base leading-6 mb-6">
        U_Today@U_Today·
        <br /> Mar 1 + Follow #ShibaInu $SHIB Now Accepted at Fast Food
        Wendy&apos;s and 600 Businesses via This Partnership
        <br />
        <br /> Shiba Inu (#SHIB) can now be used to buy Wendy&apos;s meals and
        also be spent at more than 600 other vendors, including major hotels,
        restaurants and supermarkets in the state of Georgia, via a new Binance
        Pay partnership. Web link
      </p>
      <Image
        src="./images/blog/mock_post_image.png"
        width={600}
        height={400}
        alt="post_image"
        style={{ width: "100%" }}
        className="rounded-[15px]"
        loader={myImageLoader}
      />
    </div>
  );
};

export default Post;
