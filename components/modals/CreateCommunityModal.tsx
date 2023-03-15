import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { setShowCreateCommunityModal } from "redux/counterSlice";
import Modal from "components/Modal";
import InputGroup from "components/InputGroup";
import Button from "components/Button";
import { useProgram } from "providers";
import { createCommunity } from "utils/metaplex";
import { useUser } from "providers/UserProvider";

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
    formState: { errors },
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
