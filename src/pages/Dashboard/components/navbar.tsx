import React from "react";
import { images } from "../../../assets";
import CustomizedInput from "./customizedInput";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";
import { useAtom } from "jotai";
import { appAtom } from "../../../atoms/app";
import { Dropdown, Text, Avatar } from "rizzui";
import useNavigateTo from "../../../hooks/useNavigateTo";
import useSignOutUser from "../../../hooks/useSignOutUser";
import getGravatarUrl from "../../../utils/gravatar";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuthenticatedUser();
  const [app, setApp] = useAtom(appAtom);
  const { navigateToSettings } = useNavigateTo();
  const { handleSignOut } = useSignOutUser();
  return (
    <div className="flex flex-col justify-center self-stretch px-8 py-4 backdrop-blur-[32px] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 items-center">
          <button onClick={toggleSidebar} className="border p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <CustomizedInput
            icon={images.searchIcon}
            placeholder="Search..."
            divClassName="md:hidden lg:block"
          />
        </div>
        <div className="flex gap-4 items-center">
          {/* <img
            src={images.ngFlag}
            className="shrink-0 self-stretch my-auto aspect-square w-[31px]"
          />
          <img
            src={images.bellIcon}
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <img
            src={images.inboxIcon}
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
          /> */}
          <div className="flex gap-4 justify-center self-stretch">
            {/* <div className="">
              <img
                src={images.oyinAvatar}
                className="shrink-0 aspect-square w-[45px]"
              />
            </div> */}

            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <Avatar
                  name={user.fullName}
                  src={getGravatarUrl('user.email')}
                  className="cursor-pointer"
                />
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-56 divide-y text-gray-600">
                <Dropdown.Item className="hover:bg-transparent">
                  <Avatar
                    name={user.fullName}
                    src={getGravatarUrl(user.email)}
                  />
                  <span className="ml-2 text-start">
                    <Text className="text-gray-900 font-medium leading-tight">
                      {user.fullName}
                    </Text>
                    <Text>{user.email}</Text>
                  </span>
                </Dropdown.Item>
                <div className="mt-3 mb-2 pt-2">
                  <Dropdown.Item
                    onClick={() => navigateToSettings()}
                    className="hover:bg-gray-900 hover:text-gray-50"
                  >
                    Account Settings
                  </Dropdown.Item>
                </div>
                <div className="mt-2 pt-2">
                  <Dropdown.Item
                    onClick={() => handleSignOut()}
                    className="hover:bg-gray-900 hover:text-gray-50"
                  >
                    Sign Out
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <div className="">
              <div className="flex flex-col">
                <div className="text-base leading-7 text-brown">
                  {user.fullName}
                </div>
                <div className="text-sm leading-4 text-clayGray">
                  Clay Admin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
