import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<IProps> = ({ name, placeholder, ...rest }) => {
  return (
    <input
      {...rest}
      type="text"
      id={`item-${name}`}
      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
      placeholder={placeholder}
      name={name}
    />
  );
};
export default Input;
