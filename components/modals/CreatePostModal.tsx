import { useEffect, useState } from "react";
import { Nft, NftWithToken, Sft } from "@metaplex-foundation/js";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useSelector, useDispatch } from "react-redux";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { FileUploader } from "react-drag-drop-files";

import { createNft, getMetaplex } from "utils/metaplex";
import myImageLoader from "utils/loader";
import { defaultLitArgs, encrypt, solRpcConditions } from "utils/lit";
import { useProgram } from "providers";
import { setShowCreatePostModal } from "redux/counterSlice";

const FILE_TYPES = [
  "JPG",
  "JPEG",
  "PNG",
  "GIF",
  "SVG",
  "MP4",
  "WEBM",
  "MP3",
  "WAV",
  "OGG",
  "GLB",
  "GLTF",
];
const TEST_MINT = `Dz6bybA6jgjKBVnVvS1P4UsiJdVM4ZurEgkpu5u4ESTX`;

interface IProps {}

const CreatePostModal: React.FC<IProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();

  const dispatch = useDispatch();
  const { showCreatePostModal } = useSelector((state: any) => state.counter);
  const wallet = useConnectedWallet();
  const { solcialProgram, metaplex } = useProgram();

  const onChangeFile = (file) => {
    setFile(file);
  };

  const onSubmit = async () => {
    try {
      if (wallet.connected) {
        const litArgs = defaultLitArgs(TEST_MINT);
        const { key, file: encryptedZipFile } = await encrypt([file], litArgs);
        const solConditions = solRpcConditions(litArgs);
        const encryptionData = {
          encryptedSymmetricKey: key,
          solRpcConditions: solConditions,
        };

        await createNft(
          {
            ...encryptionData,
            description: "my descriptionnnn",
            file: encryptedZipFile,
          },
          metaplex
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="">
      <div
        className={showCreatePostModal ? "modal fade show block" : "modal fade"}
      >
        <div className="modal-dialog w-1/2 ">
          <div className="modal-content h-[inherit] p-10">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Create Post
              </h5>
              <button
                type="button"
                className="btn-close bg-jacarta-600 p-4 rounded-full"
                onClick={() => dispatch(setShowCreatePostModal(false))}
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
              {/* contenteditable */}
              <div className="mt-6 mx-auto">
                <div className="mb-6">
                  {/* <!-- Description --> */}
                  <label
                    htmlFor="item-title"
                    className="font-display text-jacarta-700 mb-2 block dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="item-title"
                    className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                    placeholder="Title"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="item-description"
                    className="font-display text-jacarta-700 mb-2 block dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="item-description"
                    className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                    rows={4}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* <!-- File Upload --> */}
                <div className="mb-6">
                  <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                    Image, Video, Audio, or 3D Model
                  </label>

                  {file ? (
                    <p className="dark:text-jacarta-300 text-2xs mb-3">
                      successfully uploaded : {file.name}
                    </p>
                  ) : (
                    <p className="dark:text-jacarta-300 text-2xs mb-3">
                      Drag or choose your file to upload
                    </p>
                  )}

                  <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                    <div className="relative z-10 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                      </svg>
                      <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                        JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF.
                        Max size: 100 MB
                      </p>
                    </div>
                    <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                      <FileUploader
                        handleChange={onChangeFile}
                        onDrop={onChangeFile}
                        multiple={false}
                        name="file"
                        types={FILE_TYPES}
                        classes="file-drag"
                        maxSize={100}
                        minSize={0}
                      />
                    </div>
                  </div>
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
