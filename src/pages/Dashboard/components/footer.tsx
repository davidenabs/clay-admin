import React from "react";

const Footer = ({ isSidebarOpen }) => {
  return (
    <div
      className={`bg-white shadow-sm fixed bottom-0 w-full  ${
        isSidebarOpen ? "pr-[290px]" : ""
      } px-11 transition ease-in-out py-4 text-xs text-brown max-md:px-5`}
    >
      <div className="flex gap-5 justify-between w-full">
        <div className="flex gap-5">
          <div>Privacy Policy</div>
          <div>Terms of Use</div>
        </div>
        <div>
          <span className="font-bold">ClayAfrica </span>
          &copy; 2024 Copyright <span className="font-bold">
            ClayAfrica
          </span>{" "}
          Clay-Africa.
        </div>
      </div>
    </div>
  );
};

export default Footer;
