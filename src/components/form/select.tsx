import React from "react";
import PropTypes from "prop-types";
import { Select } from "rizzui";

interface SelectFieldProps {
  label: string;
  error?: string;
  className?: string;
  options: any;
  [key: string]: any; // To support any other props passed down
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error = "",
  className = "",
  options,
  ...rest
}) => {
  return (
    <div className="flex flex-col my-1">
      <Select
        options={options}
        label={label}
        labelClassName="text-[#8A92A6] font-normal"
        selectClassName={`${className} rounded border bg-transparent  border-brown border-solid focus:outline-none focus:border-[#CD8246] focus:border-1 transition ease-in-out max-md:max-w-full w-full`}
        {...rest}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default SelectField;
