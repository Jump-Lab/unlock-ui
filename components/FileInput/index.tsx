import classNames from "classnames";
import FilePreview from "components/InputGroup/FilePreview";
import Image from "next/image";
import React, { useRef } from "react";
import myImageLoader from "utils/loader";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formValue?: any;
}

const EditLayer: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <div className="absolute top-0 right-0 h-full w-full bg-black/60 z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity duration-200">
      <button
        onClick={onClick}
        className="flex items-center px-4 py-2 bg-accent-dark text-white rounded-7x gap-x-2"
      >
        <Image
          src="/images/edit.svg"
          width={20}
          height={20}
          alt="Close"
          loader={myImageLoader}
        />
        <span className="text-base leading-6 font-bold font-body">Edit</span>
      </button>
    </div>
  );
};

const FileInput: React.FC<IProps> = ({ formValue, ...rest }) => {
  console.log("Log ~ file: index.tsx:6 ~ rest:", rest);
  const inputRef = useRef<HTMLInputElement>(null);
  const type = formValue?.type.split("/")[0];

  const openInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center w-full relative rounded-lg overflow-hidden group">
      <label
        htmlFor="dropzone-file"
        className={classNames(
          "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
          !!type && "opacity-0"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          ref={inputRef}
          id="dropzone-file"
          type="file"
          className="hidden"
          {...rest}
        />
      </label>

      {type && (
        <>
          {/* <Image
            fill
            className="object-cover"
            src={URL.createObjectURL(formValue)}
            loader={myImageLoader}
            alt="Picture of the author"
          />
          <EditLayer
            onClick={() => {
              openInput();
            }}
          /> */}
          <FilePreview file={formValue} onClickEdit={openInput} />
        </>
      )}
    </div>
  );
};
export default FileInput;
