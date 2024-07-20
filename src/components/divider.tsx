import React from 'react';

const Divider = ({ className = '' }) => {
  return (
    <div className={`${className} mt-4 w-full h-px bg-gray-200 min-h-[1px] max-md:max-w-full`} />
  );
};

export default Divider;
