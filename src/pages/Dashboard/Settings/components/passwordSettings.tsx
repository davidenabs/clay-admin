import React, { useCallback, useState } from "react";
import InputField from "../../../../components/form/input";
import { apiLoadingAtom } from "../../../../atoms/apiAtoms";
import { useAtom } from "jotai";
import Button from "../../../../components/form/button";
import createApiManager from "../../../../managers/apiManager";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import {
  userPasswordAtom,
  userPasswordErrorAtom,
} from "../../../../atoms/userPasswordAtom";

type Props = {};

const PasswordSettings: React.FC<Props> = () => {
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const [formState, setFormState] = useAtom(userPasswordAtom);
  const [formErrorState, setFormErrorState] = useAtom(userPasswordErrorAtom);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!passwordsMatch) {
        showErrorToast("Passwords do not match");
        return;
      }

      try {
        const response = await apiManager.updatePassword(formState);
        showSuccessToast("Password updated successfully");
      } catch (error) {
        showErrorToast(error.message);
      }
    },
    [formState]
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        confirmPassword: value,
      }));
      setPasswordsMatch(formState.newPassword === value);
    },
    [formState]
  );

  const formData = [
    {
      label: "Current Password",
      name: "oldPassword",
      placeholder: "Enter Current Password",
      type: "password",
    },
    {
      label: "New Password",
      name: "newPassword",
      placeholder: "Enter New Password",
      type: "password",
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      placeholder: "Confirm New Password",
      type: "password",
      onChange: handleConfirmPasswordChange,
      error: !passwordsMatch ? "Passwords do not match" : "",
    },
  ];

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col p-6 w-full text-base font-medium leading-6 rounded-xl border border-gray-100 border-solid text-brown max-md:px-5 max-md:mt-5 max-md:max-w-full"
      >
        <div className="max-md:max-w-full">Update Password</div>
        <div className="mt-2 text-sm text-clayGray max-md:max-w-full">
          Enter your current password and new password below
        </div>

        <div className="space-y-4">
          {formData.map((field) => (
            <div key={field.name}>
              <div className="text-base font-medium text-brown">
                {field.label}
              </div>
              <InputField
                label=""
                name={field.name}
                value={formState[field.name] || ""}
                onChange={field.onChange || handleInputChange}
                required
                placeholder={field.placeholder}
                error={formErrorState[field.name] || field.error || ""}
                className="w-full ring-0 !border-gray-300 focus:border-[#CD8246] focus:border-1"
                type={field.type}
                disabled={loading}
              />
            </div>
          ))}
        </div>

        <div className="justify-center self-end mt-14 text-xs max-md:px-5 max-md:mt-10">
          <Button
            className="px-6 py-4 rounded-2xl"
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

export default PasswordSettings;
