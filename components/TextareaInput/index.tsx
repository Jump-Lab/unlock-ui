import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: UseFormRegister<FieldValues>;
}

const TextareaInput: React.FC<IProps> = ({
  name,
  placeholder,
  rows = 3,
  register,
  ...rest
}) => {
  return (
    <textarea
      {...rest}
      id={`item-${name}`}
      rows={rows}
      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
      placeholder={placeholder}
      name={name}
      {...register(name)}
    />
  );
};
export default TextareaInput;
