import React from "react";
import ProfileSettings from "./components/profileSettings";
import PasswordSettings from "./components/passwordSettings";

const Settings = () => {

  return (
    <div className="mx-10 my-10 max-md:max-w-full">
      <div className="flex flex-col items-start px-16 py-10 mb-10 rounded-2xl max-md:px-5 bg-white">
        <div className="text-xl font-semibold leading-7 text-brown">
          Settings
        </div>
        <div className="text-sm leading-5 text-clayGray">
          Control your profile setup and integrations
        </div>

        <div className="flex gap-5 pr-20 mt-5 max-w-full text-base leading-6 text-center whitespace-nowrap w-[1096px] max-md:flex-wrap max-md:pr-5">
          <div className="flex flex-col justify-center pt-4 text-blue">
            <div className="self-center">Profile</div>
            <div className="shrink-0 mt-4 h-px bg-blue w-20" />
          </div>
          {/* <div className="flex flex-col justify-center pt-4 text-[color(display-p3_0.2039_0.251_0.3294)]">
            <div className="self-center">Team</div>
            <div className="shrink-0 mt-4 h-px" />
          </div> */}
        </div>

        <div className="self-start mt-4 w-full max-w-[1096px] max-md:max-w-full">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="flex flex-col w-full">
              <ProfileSettings />
            </div>

            <div className="w-full">
              <PasswordSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
