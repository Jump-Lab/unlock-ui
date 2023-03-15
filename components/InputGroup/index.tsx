import React from "react";

import Label from "components/Label";
import Input from "components/Input";
import FileInput from "components/FileInput";
import { FieldValues, UseFormRegister } from "react-hook-form";
import TextAreaInput from "components/TextareaInput";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  title: string;
  name: string;
  subTitle?: string;
  isTextarea?: boolean;
  register: UseFormRegister<FieldValues>;
}

const InputGroup: React.FC<IProps> = ({
  title,
  subTitle,
  name,
  required,
  type = "text",
  className,
  isTextarea,
  ...rest
}) => {
  let inputElement = <Input name={name} {...rest} />;
  if (type === "file") {
    inputElement = <FileInput name={name} {...rest} />;
  }
  if (isTextarea) {
    inputElement = <TextAreaInput name={name} {...rest} />;
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
