import React from "react";

const TableButton = ({
  children,
  className = "",
  onClick = () => {},
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={`justify-center self-start p-2.5 text-xs tracking-normal leading-3 text-center rounded-2xl border border-solid border-blue text-blue hover:bg-gray-200 hover:text-gray-800 transition duration-300 ${className}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TableButton;
