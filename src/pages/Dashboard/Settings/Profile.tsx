import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomizedInput from "../components/customizedInput";
import Button from "../../../components/form/button";
import { images } from "../../../assets";
import Divider from "../../../components/divider";

const SettingsProfile = () => {
  return (
    <div className="mx-10 my-10 max-md:max-w-full">
      <div className="flex flex-col items-start px-16 py-10 mb-10 rounded-2xl max-md:px-5 bg-white">
        <div className="text-xl font-semibold leading-7 text-brown">
          Settings
        </div>
        <div className="text-sm leading-5 text-clayGray">
          Take a look at your policies and the new policy to see what is covered
        </div>

        <div className="flex mt-8 mb-3 text-sm ">
          <div className="justify-center px-4 py-2.5 font-medium rounded-l-lg border border-gray-100 bg-gray-200 border-solid text-black">
            Profile
          </div>
          <div className="justify-center px-4 py-2.5 font-light rounded-r-lg  border border-gray-200 border-solid text-clayGray">
            Team
          </div>
        </div>

        <div className="self-start mt-4 w-full max-w-[1096px] max-md:max-w-full">
          <div className="flex flex-col w-full lg:w-10/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-6 w-full rounded-xl border border-gray-100 border-solid leading-[145%] max-md:px-5 max-md:mt-5 max-md:max-w-full">
              <div className="max-w-full w-[485px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[72%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-sm leading-5 max-md:mt-10">
                      <div className="text-base font-medium text-brown">
                        Profile photo
                      </div>
                      <div className="mt-1.5 leading-5 text-clayGray">
                        This image will be displayed<br></br>on your profile
                      </div>
                      <div className="flex flex-col justify-center px-3 py-2 mt-5 w-fit text-center rounded-md border-2 border-lightBrown border-solid text-lightBrown max-md:px-5">
                        <div className="flex gap-2 justify-center">
                          <img
                            src={images.imageAddYellowIcon}
                            className="shrink-0 w-5 aspect-square"
                          />
                          <div>Change Photo</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full relative">
                    <img
                      src={images.oyinAvatar}
                      className="shrink-0 max-w-full aspect-square w-[124px] max-md:mt-10"
                    />
                    <div className="flex absolute bottom-1 right-1 rounded-full bg-blue w-fit p-2 justify-center">
                      <img
                        src={images.checkIcon}
                        className="shrink-0 w-[20px] aspect-square"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8">
                <Divider />
              </div>
              <div className="grid lg:grid-cols-3 gap-5 max-md:gap-0">
                <div className="flex lg:col-span-1 w-4/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-sm leading5 max-md:mt10">
                    <div className="text-base font-medium text-brown">
                      Profile Information
                    </div>
                    <div className="mt-1.5 leading-5 text-clayGray">
                      Update your personal details here.
                    </div>
                    <Link to={"/settings/profile-preview"}>
                      <Button
                        className="rounded-md text-sm py-2 mt-5 text-center w-32 !px-0 bg-gray-300"
                        style={{ paddingLeft: "" }}
                      >
                        Save Changes
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="flex flex-col w-full -mt-5">
                    <div className="grid lg:grid-cols-2 lg:gap-3 ">
                      <div>
                        <div className="mt-6 text-base font-medium text-brown max-md:max-w-full">
                          First Name
                        </div>

                        <CustomizedInput
                          divClassName={"mt-1 border-gray-300 rounded-md"}
                          placeholder={"Oyinkansola"}
                          type="text"
                        />
                      </div>
                      <div>
                        <div className="mt-6 text-base font-medium text-brown max-md:max-w-full">
                          Last Name
                        </div>

                        <CustomizedInput
                          divClassName={"mt-1 border-gray-300 rounded-md"}
                          placeholder={"Soleye"}
                          type="text"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-6 text-base font-medium text-brown max-md:max-w-full">
                        Email
                      </div>

                      <CustomizedInput
                        divClassName={
                          "mt-1 border-gray-300 bg-gray-100 r rounded-md"
                        }
                        placeholder={"oyinkansola269@gmail.com"}
                        type="text"
                      />
                    </div>
                    <div>
                      <div className="mt-6 text-base font-medium text-brown max-md:max-w-full">
                        Username
                      </div>

                      <CustomizedInput
                        divClassName={"mt-1 border-gray-300  rounded-md"}
                        placeholder={"@Kaansolaaa"}
                        type="text"
                      />
                      <div className="bg-[#E7F6EC] text-green-600 text-xs mt-2 w-fit px-3 py-1 rounded-full">
                        <div className="flex gap-2 items-center">
                          <img
                            src={images.checkCircleIcon}
                            className="w-[16px]"
                          />
                          The username is available
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-6 text-base font-medium text-brown max-md:max-w-full">
                        Role
                      </div>

                      <CustomizedInput
                        divClassName={"mt-1 border-gray-300 rounded-md"}
                        placeholder={"Manager"}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-between p-6 w-full text-base font-medium leading-6 rounded-xl border border-gray-100 border-solid text-brown max-md:px-5 max-md:mt-5 max-md:max-w-full">
                <div className="max-md:max-w-full">Update Password</div>
                <div className="mt-2 text-sm text-clayGray max-md:max-w-full">
                  Enter your current password to make update
                </div>
                <div className="mt-8 max-md:max-w-full">Current Password</div>

                <CustomizedInput
                  className={"mt-1 border-gray-300 rounded-md"}
                  placeholder={"Enter Password"}
                  icon={images.lockIcon}
                  type="text"
                />

                <div className="mt-6 max-md:max-w-full">New Password</div>

                <CustomizedInput
                  className={"mt-1 border-gray-300 rounded-md"}
                  placeholder={"Enter New Password"}
                  icon={images.lockIcon}
                  type="text"
                />

                <div className="justify-center self-end  mt-14 text-xs ax-md:px-5 max-md:mt-10">
                  <Button className="px-6 py-4 rounded-md">Save Changes</Button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
