import React from "react";
import PropTypes from "prop-types";
import { Button as RizzuiButton } from "rizzui";


interface ButtonProps {
  children?: any;
  className?: string;
  [key: string]: any; 
}


const Button: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return (
    <RizzuiButton
      className={`${className} justify-center px-6 py-5 mt-6 text-base leading-7 text-center rounded-2xl bg-clayBlue text-white font-normal max-md:px-5 w-[188px] transition ease-in-out duration-300 hover:!bg-clayBlue/95`}
      {...rest}
    >
      {children}
    </RizzuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Button.defaultProps = {
//   className: "",
// };

export default Button;
