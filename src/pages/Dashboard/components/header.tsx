import React from "react";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";

const Header = () => {
  const { user } = useAuthenticatedUser();

  return (
    <div className="bg-header-bg bgno-repeat w-full h-[276px] flex flex-col justify-center rounded-b-[20px]">
      <div className="mt-10 ml-10 text-4xl font-[1000] text-white max-md:max-w-full ">
        Hello {user.fullName}!
      </div>
      <div className="mt-2 ml-10 text-xl font-medium leading-7 text-white sm:text-sm md:text-md md:leading-6 lg:text-xl lg:leading-7 max-w-full">
        We are on a mission to help developers like you to build beautiful
        projects for <span className="uppercase">free.</span>
      </div>
    </div>
  );
};

export default Header;
