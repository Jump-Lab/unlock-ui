import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button";
import InputGroup from "components/InputGroup";
import Modal from "components/Modal";
import { useProgram } from "providers";
import { useUser } from "providers/UserProvider";
import { setShowCreatePostModal } from "redux/counterSlice";
import { defaultLitArgs, encrypt, solRpcConditions } from "utils/lit";
import { createPost } from "utils/metaplex/createPost";

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
  const dispatch = useDispatch();
  const { showCreatePostModal } = useSelector((state: any) => state.counter);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { metaplex } = useProgram();
  const { user } = useUser();

  const onChangeFile = (file) => {
    console.log(
      "Log ~ file: CreatePostModal.tsx:43 ~ onChangeFile ~ file",
      file
    );
  };

  const onSubmit = async (data) => {
    try {
      const litArgs = defaultLitArgs(TEST_MINT);
      const { encryptedSymmetricKey, file: encryptedZipFile } = await encrypt(
        data.file,
        litArgs
      );
      const solConditions = solRpcConditions(litArgs);
      const encryptionData = {
        encryptedSymmetricKey,
        solRpcConditions: solConditions,
      };

      const postData = {
        ...data,
        ...encryptionData,
        file: encryptedZipFile,
        // TODO: Input for getting collection address
        collectionAddress: "7o7Ae9rcnZK67MGxwnzWdnwiCe48ZpK2BCTACvvVvMuQ",
      };

      const postAddress = await createPost(postData, metaplex);
      console.log(
        "Log ~ file: CreatePostModal.tsx:29 ~ onSubmit ~ communityAddress:",
        postAddress
      );
    } catch (e) {
      console.log(e);
    }
  };

  const body = (
    <>
      <InputGroup
        title="Title"
        placeholder="Post Title"
        name="name"
        required
        register={register}
      />
      <InputGroup
        title="Text"
        placeholder="Post Content"
        name="description"
        isTextarea
        register={register}
      />
      <InputGroup
        name="file"
        className="mt-6"
        type="file"
        title="Asset"
        register={register}
      />
    </>
  );

  const footer = (
    <div className="flex flex-row">
      <Button
        isSecondary
        onClick={() => dispatch(setShowCreatePostModal(false))}
      >
        Cancel
      </Button>
      <Button isPrimary className="ml-4" type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        isOpen={showCreatePostModal}
        title="Create a post"
        onClose={() => dispatch(setShowCreatePostModal(false))}
        body={body}
        footer={footer}
      />
    </form>
  );
};
export default CreatePostModal;
