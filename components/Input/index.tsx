import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<IProps> = ({ name, placeholder, register, ...rest }) => {
  return (
    <input
      {...rest}
      type="text"
      id={`item-${name}`}
      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
      placeholder={placeholder}
      name={name}
      {...register(name)}
    />
  );
};
export default Input;
