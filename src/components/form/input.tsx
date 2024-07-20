import React from "react";
import PropTypes from "prop-types";
import { Input } from "rizzui";

interface InputFieldProps {
  label: string;
  error?: string;
  className?: string;
  [key: string]: any; // To support any other props passed down
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error = "",
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col my-1">
      <Input
        label={label}
        labelClassName="text-[#8A92A6] font-normal"
        inputClassName={`${className} rounded border bg-transparent  border-brown border-solid focus:outline-none focus:border-[#CD8246] focus:border-1 transition ease-in-out max-md:max-w-full w-full`}
        {...rest}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default InputField;
