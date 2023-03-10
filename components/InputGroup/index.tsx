import React from "react";

import Label from "components/Label";
import Input from "components/Input";
import FileInput from "components/FileInput";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  subTitle?: string;
  name: string;
}

const InputGroup: React.FC<IProps> = ({
  title,
  subTitle,
  name,
  required,
  type = "text",
  className,
  ...rest
}) => {
  return (
    <div className={className}>
      <Label name={name} required={required}>
        {title}
      </Label>
      <p className="dark:text-jacarta-300 text-2xs mb-3">{subTitle}</p>
      {type === "text" && <Input name={name} {...rest} />}
      {type === "file" && <FileInput name={name} {...rest} />}
    </div>
  );
};
export default InputGroup;
