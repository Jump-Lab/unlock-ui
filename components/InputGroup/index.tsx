import React from "react";

import FileInput from "components/FileInput";
import Input from "components/Input";
import Label from "components/Label";
import TextAreaInput from "components/TextareaInput";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  title: string;
  name: string;
  subTitle?: string;
  isTextarea?: boolean;
  register: UseFormRegister<FieldValues>;
  formValue?: any;
  onInputChange?: (e: any) => void;
}

const InputGroup: React.FC<IProps> = ({
  title,
  subTitle,
  name,
  required,
  type = "text",
  className,
  isTextarea,
  formValue,
  register,
  onChange,
  ...rest
}) => {
  let inputElement = <Input name={name} {...rest} register={register} />;
  if (type === "file") {
    inputElement = (
      <FileInput
        name={name}
        {...rest}
        formValue={formValue}
        register={register}
      />
    );
  }
  if (isTextarea) {
    inputElement = <TextAreaInput name={name} {...rest} register={register} />;
  }

  return (
    <div className={className}>
      <Label name={name} required={required}>
        {title}
      </Label>
      <p className="dark:text-jacarta-300 text-2xs mb-3">{subTitle}</p>
      {inputElement}
    </div>
  );
};
export default InputGroup;
