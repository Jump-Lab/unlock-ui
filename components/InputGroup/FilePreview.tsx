import Button from "components/Button";
import Image from "next/image";
import myImageLoader from "utils/loader";

type Props = {
  file: File | null;
  onClickEdit: () => void;
};

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

const FilePreview: React.FC<Props> = ({ file, onClickEdit }) => {
  if (!file) return null;

  const type = file.type.split("/")[0];
  if (type === "image") {
    return (
      <>
        {" "}
        <Image
          fill
          className="object-cover"
          src={URL.createObjectURL(file)}
          loader={myImageLoader}
          alt="Picture of the author"
        />
        <EditLayer onClick={onClickEdit} />
      </>
    );
  }

  if (type === "video") {
    return (
      <>
        <video className="w-full h-full" src={URL.createObjectURL(file)}></video>
        <EditLayer onClick={onClickEdit} />
      </>
    );
  }
};

export default FilePreview;
