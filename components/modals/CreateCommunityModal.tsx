import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { setShowCreateCommunityModal } from "redux/counterSlice";
import Modal from "components/Modal";
import InputGroup from "components/InputGroup";
import Button from "components/Button";

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

  const onSubmit = async (data) => {
    console.log(
      "Log ~ file: CreateCommunityModal.tsx:22 ~ onSubmit ~ data:",
      data
    );
  };

  const body = (
    <>
      <InputGroup
        title="Name"
        placeholder="Community Name"
        required
        {...register("name")}
      />
      <InputGroup className="mt-6" type="file" title="Cover image" {...register("file")} />
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
      <Button
        isPrimary
        className="ml-4"
        // onClick={handleSubmit(onSubmit)}
        type="submit"
      >
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
