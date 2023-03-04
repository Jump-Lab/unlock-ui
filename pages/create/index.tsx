import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useConnectedWallet } from "@saberhq/use-solana";

import Meta from "components/Meta";
import { defaultLitArgs, solRpcConditions } from "utils/lit";
import { encrypt } from "utils/lit/encrypt";
import { useProgram } from "providers";
import { httpRequest } from "apis";
import { HTTP_METHODS } from "constant";
import { useUser } from "providers/UserProvider";

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

const Create = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const { metaplex } = useProgram();
  const { user } = useUser();
  console.log("Log ~ file: index.tsx:34 ~ Create ~ user:", user);
  const wallet = useConnectedWallet();

  const onChangeFile = (file) => {
    setFile(file);
  };

  const onSubmit = async () => {
    const litArgs = defaultLitArgs(TEST_MINT);
    const { key, file: encryptedZipFile } = await encrypt([file], litArgs);
    const solConditions = solRpcConditions(litArgs);
    const encryptionData = {
      encryptedSymmetricKey: key,
      solRpcConditions: solConditions,
    };

    // const requestParams = {
    //   url: `/upload`,
    //   method: HTTP_METHODS.POST,
    //   data: { file: encryptedZipFile },
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // const fileBundlrLink = await httpRequest(requestParams);
  };

  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Create
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Description
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                The description will be included on the {"item's"} detail page
                underneath its image. Markdown syntax is supported.
              </p>
              <textarea
                id="item-description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows={4}
                required
                placeholder="Provide a detailed description of your item."
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            {/* <!-- File Upload --> */}
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Image, Video, Audio, or 3D Model
                <span className="text-red">*</span>
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
                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
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

            {/* <!-- Submit --> */}
            <button
              onClick={onSubmit}
              className="bg-accent-lighter cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
            >
              Create
            </button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;
