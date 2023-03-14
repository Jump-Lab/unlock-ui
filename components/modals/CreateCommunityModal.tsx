import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button";
import InputGroup from "components/InputGroup";
import Modal from "components/Modal";
import { useProgram } from "providers";
import { useUser } from "providers/UserProvider";
import { setShowCreateCommunityModal } from "redux/counterSlice";
import { createCommunity } from "utils/metaplex";

interface IProps {}

const CreateCommunityModal: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { showCreateCommunityModal } = useSelector(
    (state: any) => state.counter
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm();
  const { metaplex } = useProgram();
  const { user } =useUser();

  const onSubmit = async (data) => {
    const communityAddress = await createCommunity(data, metaplex);
    console.log(
      "Log ~ file: CreateCommunityModal.tsx:29 ~ onSubmit ~ communityAddress:",
      communityAddress
    );
  };

  const body = (
    <>
      <InputGroup
        title="Name"
        placeholder="Community Name"
        name="name"
        required
        register={register}
      />
      <InputGroup
        title="Description"
        placeholder="Community Description"
        name="description"
        isTextarea
        register={register}
      />
      <InputGroup
        name="file"
        className="mt-6"
        type="file"
        title="Cover image"
        register={register}
      />
      <InputGroup
        className="mt-6"
        type="file"
        title="Cover image"
        {...register("file")}
        onChange={(e) => {
          setValue("file", e.target.files[0]);
        }}
        formValue={watch("file")}
      />
    </>
  );

  const footer = (
    <div className="flex flex-row">
      <Button
        isSecondary
        onClick={() => dispatch(setShowCreateCommunityModal(false))}
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
        isOpen={showCreateCommunityModal}
        title="Create a community"
        onClose={() => dispatch(setShowCreateCommunityModal(false))}
        body={body}
        footer={footer}
      />
    </form>
  );
};
export default CreateCommunityModal;
