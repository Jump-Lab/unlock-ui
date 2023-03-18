import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button";
import InputGroup from "components/InputGroup";
import Modal from "components/Modal";
import { useProgram } from "providers";
import { useUser } from "providers/UserProvider";
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
  const dispatch = useDispatch();
  const { showCreatePostModal } = useSelector((state: any) => state.counter);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
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
    console.log("submit", data);
    return;
  };

  const imageFileValue = useWatch({
    control,
    name: "file",
  });

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
        formValue={imageFileValue?.[0]}
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
