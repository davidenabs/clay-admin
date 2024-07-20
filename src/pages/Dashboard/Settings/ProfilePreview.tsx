import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomizedInput from "../components/customizedInput";
import Button from "../../../components/form/button";
import { images } from "../../../assets";
import Divider from "../../../components/divider";

const SettingsProfilePreview = () => {
  return (
    <div className="mx-10 my-10 max-md:max-w-full">
      <div className="flex flex-col items-start px-16 py-10 mb-10 rounded-2xl max-md:px-5 bg-white">
        <div className="text-xl font-semibold leading-7 text-brown">
          Settings
        </div>
        <div className="text-sm leading-5 text-clayGray">
          Take a look at your policies and the new policy to see what is covered
        </div>

        <div className="self-start mt-6 w-full max-w-[1096px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col lg:w-10/12 max-md:ml-0 w-full">
              <div className="flex flex-col grow p-6 py-10 items-center w-full rounded-xl border border-gray-100 border-solid leading-[145%] max-md:px-5 max-md:mt-5 max-md:max-w-full">
                  <div className="flex gap-5 justify-between max-w-full w-[588px] max-md:flex-wrap">
                    <div className="flex gap-4 py-1.5 pr-20 pl-3 max-md:flex-wrap max-md:pr-5">
                      <img
                        src={images.mailYellowIcon}
                        className="shrink-0 my-auto w-8 aspect-square"
                      />
                      <div className="flex flex-col">
                        <div className="text-base font-medium leading-6 text-brown">
                          Email settings
                        </div>
                        <div className="flex gap-1 text-xs whitespace-nowrap">
                          <div className="my-auto leading-[140%] text-clayGray">
                            thegabriellsmcpherson@email.com
                          </div>
                          <div className="justify-center px-2 py-0.5 font-medium text-center rounded-xl leading-[145%] bg-[#E7F6EC] text-green-600">
                            Verified
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      src={images.arrowDownYellowIcon}
                      className="shrink-0 my-auto aspect-[0.95] w-[19px]"
                    />
                  </div>
                  <div className="flex gap-5 justify-between mt-8 max-w-full text-base font-medium leading-6 text-brown w-[588px] max-md:flex-wrap">
                    <div className="flex gap-4 py-2.5 pr-20 pl-3 max-md:flex-wrap max-md:pr-5">
                      <img
                        src={images.lockYellowIcon}
                        className="shrink-0 my-auto w-8 aspect-square"
                      />
                      <div className="pb-3.5">Change Password</div>
                    </div>
                    <img
                      src={images.arrowDownYellowIcon}
                      className="shrink-0 my-auto aspect-[0.95] w-[19px]"
                    />
                  </div>
                  <div className="flex gap-5 justify-between mt-8 max-w-full w-[588px] max-md:flex-wrap">
                    <div className="flex gap-4 py-2 pr-20 pl-3 max-md:flex-wrap max-md:pr-5">
                      <img
                        src={images.phoneYellowIcon}
                        className="shrink-0 my-auto w-8 aspect-square"
                      />
                      <div className="flex flex-col">
                        <div className="text-base font-medium leading-6 text-brown">
                          2-step verification
                        </div>
                        <div className="text-xs leading-4 text-clayGray">
                          Manage your 2-step authentication methods
                        </div>
                      </div>
                    </div>
                    <img
                      src={images.arrowDownYellowIcon}
                      className="shrink-0 my-auto aspect-[0.95] w-[19px]"
                    />
                  </div>
                  <div className="flex gap-5 justify-between mt-8 mb-1.5 max-w-full w-[588px] max-md:flex-wrap">
                    <div className="flex gap-4 py-2 pr-20 pl-3 max-md:flex-wrap max-md:pr-5">
                      <img
                        src={images.existYellowIcon}
                        className="shrink-0 my-auto w-8 aspect-square"
                      />
                      <div className="flex flex-col">
                        <div className="text-base font-medium leading-6 text-brown">
                          Log Out
                        </div>
                        <div className="text-xs leading-4 text-clayGray">
                          If you want to stop using Clay
                        </div>
                      </div>
                    </div>
                    <img
                      src={images.arrowRightYellowIcon}
                      className="shrink-0 my-auto aspect-[0.95] w-[19px]"
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfilePreview;
