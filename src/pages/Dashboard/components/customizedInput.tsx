import React from "react";

const CustomizedInput = ({
  icon = "",
  placeholder = "",
  divClassName = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`${divClassName}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className={`${inputClassName} ${icon ? `pl-12` : ``} p-2 text-base leading-7 whitespace-nowrap rounded border border-gray-200 border-solid text-clayGray focus:border-[#CD8246] focus:border-1 transition ease-in-out bg-transparent focus:outline-none w-full`}
          {...props}
        />
        {icon && (
          <img
            src={icon}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 aspect-square"
          />
        )}
      </div>
    </div>
  );
};

export default CustomizedInput;
