import React from "react";
import classNames from "classnames";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isPrimary?: boolean;
  isSecondary?: boolean;
  children?: any;
  className?: string;
}

const Button: React.FC<IProps> = (props) => {
  const { isPrimary, isSecondary, children, className, ...rest } = props;
  const defaultClassName = isPrimary
    ? "rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
    : isSecondary
    ? " rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
    : "";
  const finalClass = classNames(defaultClassName, className);

  return (
    <button {...rest} className={finalClass}>
      {children}
    </button>
  );
};

export default Button;
