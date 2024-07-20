import React from "react";

const Table = ({ children, className = "", ...rest }) => {
  return (
    <div className="">
      <table className={`${className} w-full text-base mt-4 px-12`} {...rest}>
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ children, className = "", ...rest }) => {
  return (
    <thead>
      <tr
        className={`tracking-wide leading-4 capitalize text-clayGray ${className}`}
        {...rest}
      >
        {children}
      </tr>
    </thead>
  );
};

const TableBody = ({ children, className = "", ...rest }) => {
  return (
    <tbody className={`${className} text-[#4B260D]`} {...rest}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = "", ...rest }) => {
  return (
    <tr className={`${className} mb-2`} {...rest}>
      {children}
    </tr>
  );
};

const TableCell = ({ children, className = "", ...rest }) => {
  return (
    <td className={`${className} py-3 px-4`} {...rest}>
      {children}
    </td>
  );
};

export { Table, TableHead, TableBody, TableRow, TableCell };
