import React, { useCallback, useEffect } from "react";
import InputField from "../../../../components/form/input";
import { apiLoadingAtom } from "../../../../atoms/apiAtoms";
import { useAtom } from "jotai";
import Button from "../../../../components/form/button";
import createApiManager from "../../../../managers/apiManager";
import {
  userProfileAtom,
  userProfileErrorAtom,
} from "../../../../atoms/userProfileAtom";
import useAuthenticatedUser from "../../../../hooks/useAuthenticatedUser";
import useSignInUser from "../../../../hooks/useSignInUser";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import useNavigateTo from "../../../../hooks/useNavigateTo";
import { FileInput } from "rizzui";

type Props = {};

const ProfileSettings: React.FC<Props> = () => {
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const [formState, setFormState] = useAtom(userProfileAtom);
  const [formErrorState, setFormErrorState] = useAtom(userProfileErrorAtom);
  const { user, profile, header } = useAuthenticatedUser();
  const signInUser = useSignInUser();
  const { navigateToDashboard } = useNavigateTo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrorState((prevState) => ({
      ...prevState,
      profilePicture: "",
    }));
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const isValidImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB

      if (isValidImage && isValidSize) {
        setFormState((prevState) => ({
          ...prevState,
          profilePicture: file,
        }));
      } else {
        if (!isValidImage) {
          setFormErrorState({
            ...formErrorState,
            profilePicture: "Only image files are allowed",
          });
        }
        if (!isValidSize) {
          setFormErrorState({
            ...formErrorState,
            profilePicture: "File size should not exceed 2MB",
          });
        }
      }
    }
  };

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      fullName: user.fullName,
      organizationName: profile.organizationName,
      email: user.email,
    }));
  }, [user, profile]);

  const handleFormSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const [bearer, token] = header.split(" ");
      try {
        const response = await apiManager.updateProfile(formState);
        let data = response.data;
        data.token = token;
        data.bearer = bearer;
        await signInUser(data);
        showSuccessToast("Profile updated successful");
      } catch (error) {
        showErrorToast(error.message);
      }
    },
    [formState]
  );

  const formData = [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "Oyinkansola Soleye",
      type: "text",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8A92A6"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      label: "Organization Name",
      name: "organizationName",
      placeholder: "Clay Africa",
      type: "text",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8A92A6"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      label: "Email",
      name: "email",
      placeholder: "oyinkansola269@gmail.com",
      type: "email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8A92A6"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col grow p-6 w-full rounded-xl border border-gray-100 leading-[145%] max-md:px-5 max-md:mt-5"
      >
        <div className="text-base font-medium text-brown">Profile Settings</div>
        <div className="my-2 text-sm text-clayGray">
          These are your personal details, they are visible to the public
        </div>

        <div className="space-y-4">
          <FileInput
            label="Profile Picture"
            rounded="pill"
            onChange={handleFileChange}
            error={formErrorState.profilePicture as string}
          />

          {formData.map((field) => (
            <div key={field.name}>
              <div className="text-base font-medium text-brown">
                {field.label}
              </div>
              <InputField
                label=""
                name={field.name}
                value={formState[field.name] || ""}
                onChange={handleInputChange}
                required
                placeholder={field.placeholder}
                error={formErrorState[field.name]}
                className="w-full ring-0 !border-gray-300 focus:border-[#CD8246] focus:border-1"
                disabled={field.type === "email" || loading}
                type={field.type}
                prefix={field.icon}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-8 text-xs font-bold text-center max-md:flex-wrap">
          <Button
            className="flex-1 justify-center items-center px-6 py-4 rounded-2xl border-2 border-solid border-slate-600 !text-clayBlue hover:!bg-transparent hover:!text-white !bg-transparent"
            onClick={() => navigateToDashboard()}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-4 rounded-2xl bg-blue"
            type="submit"
            isLoading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;
