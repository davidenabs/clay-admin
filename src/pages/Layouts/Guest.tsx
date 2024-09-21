import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Guest = () => {
  return (
    <div>
       <Outlet />
    </div>
  );
};

export default Guest;
