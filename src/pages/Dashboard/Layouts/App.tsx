import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Header from "../components/header";
import Footer from "../components/footer";
import { useAtom } from "jotai";
import { appAtom } from "../../../atoms/app";

const AppLayout = () => {
  const [app, setApp] = useAtom(appAtom);
  const toggleSidebar = () => {
    setApp({ ...app, isSidebarOpen: !app.isSidebarOpen });
  };

  return (
    <>
      <div className="flex gap-0 max-md:flex-wrap bg-gray-200">
        <Sidebar
          isSidebarOpen={app.isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`flex flex-col grow shrink-0 self-start basis-0 w-full max-md:max-w-full bgwhite bg-gray-100 min-h-full bg-dashboard-bg bg-cover transition-all duration-100 ease-in-out ${
            app.isSidebarOpen ? "pl-[257px]" : "pl-0"
          }`}
        >
          <div className="flex flex-col items-start rounded-none max-md:max-w-full">
            <Navbar
              isSidebarOpen={app.isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <Header />
          </div>
          <Outlet />
          {/* Footer */}
          <Footer isSidebarOpen={app.isSidebarOpen} />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
