import React from "react";

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  required?: boolean;
}

const Label: React.FC<IProps> = ({ name, required, children }) => {
  return (
    <label
      htmlFor={`item-${name}`}
      className="font-display text-jacarta-700 mb-2 block dark:text-white"
    >
      {children}
      {required && <span className="text-red">*</span>}
    </label>
  );
};
export default Label;
