import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useMatch } from "react-router-dom";
import { images } from "../../../assets";

const NavItem = ({ to, text, iconSrc }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col justify-center items-start px-6 py-2 mt-2 w-full text-base leading-7 whitespace-nowrap rounded max-md:px-5 ${
          isActive ? "bg-lightBrown shadow-sm text-white" : "text-brown"
        }`
      }
    >
      <div className="flex gap-4">
        <img
          src={iconSrc}
          className="shrink-0 my-auto w-6 aspect-square transition ease-in-out"
          alt={text}
        />
        <div>{text}</div>
      </div>
    </NavLink>
  );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [pathname, setPathname] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex flex-col shrink-0 pb-20 shadow-lg grow-0 h-screen transition-all duration200 ease-in-out  bg-white w-[257px] ${
        isSidebarOpen ? "" : " transform -translate-x-full"
      }`}
    >
      <div className="flex gap-5 justify-between">
        <img
          src={images.clayLogo}
          className="max-w-full w-[195px]"
          alt="Logo"
        />
        {/* arrow to close and open sidebar */}
        {/* <button onClick={toggleSidebar} className="z-10 mr-[-10px]">
          <img
            src={isSidebarOpen ? images.arrowLeftIcon : images.arrowLeftIcon}
            className="shrink-0 my-auto aspect-square w-[30px] p-1 bg-lightBrown rounded-full cursor-pointer"
            alt="Toggle Sidebar"
          />
        </button> */}
      </div>
      {isSidebarOpen && (
        <>
          <NavItem
            to="/dashboard"
            iconSrc={
              pathname === "/dashboard"
                ? images.dashboardLightIcon
                : images.dashboardDarkIcon
            }
            text="Dashboard"
          />

          <NavItem
            to="/loan-management"
            iconSrc={
              pathname === "/loan-management"
                ? images.loanManagementLightIcon
                : images.loanManagementDarkIcon
            }
            text="Loan Management"
          />
          <NavItem
            to="/user-management"
            iconSrc={
              pathname === "/user-management"
                ? images.staffManagementLightIcon
                : images.staffManagementDarkIcon
            }
            text="User Management"
          />
          <NavItem
            to="/settings"
            iconSrc={
              pathname === "/settings"
                ? images.settingsLightIcon
                : images.settingsDarkIcon
            }
            text="Settings"
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
