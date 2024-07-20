import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { images } from "../../../assets";

const Guest = () => {
  const [pathname, setPathname] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  if (pathname === "/register") {
    return (
      <div className="max-md:pl5 h-screen transition ease-in-out relative">
        <div className="flex absolute justify-end w-full z-0 inset-0 overflow-hidden max-md:flex-wrap max-md:max-w-full">
          <img
            src={images.hash}
            className="top-0 right-0 mt-[-40%] mr-[-7%] max-w-full mix-blend-soft-light aspect-[0.86] w-[316px]"
          />
        </div>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 bg-white h-full">
          <div className="flex flex-col ml5 w-[50%] max-md:ml-0 max-md:w-full relative overflow-hidden">
            {/* Background */}
            <img
              src={images.circleBg2}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Logo */}
            <img
              src={images.clayLogo}
              className="absolute inset-0 w-[667px] mx-auto my-auto"
            />
          </div>

          <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pl-20 max-md:pl-5 h-screen transition ease-in-out relative">
        <div className="flex absolute justify-between w-full z-0 inset-0 overflow-hidden max-md:flex-wrap max-md:max-w-full">
          <img
            src={images.hash}
            className="top-0 mt-[-38%] ml-[-1%] max-w-full mix-blend-soft-light aspect-[0.86] w-[216px]"
          />
        </div>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 bg-white h-full">
          <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full ">
            <Outlet />
          </div>
          <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full relative overflow-hidden">
            {/* Background */}
            <img
              src={images.circleBg}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Logo */}
            <img
              src={images.clayLogo}
              className="absolute inset-0 w-[667px] mx-auto my-auto"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Guest;
