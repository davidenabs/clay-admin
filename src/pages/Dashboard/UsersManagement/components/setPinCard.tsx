import React, { useState } from "react";
import { Button, PinCode } from "rizzui";
import { useAtom } from "jotai";
import { appAtom } from "../../../../atoms/app";
import createApiManager from "../../../../managers/apiManager";
import { verificationFormStateAtom } from "../../../../atoms/staffVerificationAtom";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

const SetPinCard = ({ setIsOpen, cardNumber }) => {
  const [pin, setPin] = useState<string | number | undefined>("");
  const [app, setApp] = useAtom(appAtom);
  const apiManager = createApiManager();
  const [formState, setFormState] = useAtom(verificationFormStateAtom);

  const handleSetPin = async () => {
    if (!pin) {
      setApp({ ...app, error: "PIN is required" });
      return;
    }

    try {
      setApp({ ...app, loading: true });
      const response = await apiManager.setPin({ pin, cardNumber });
      if (response.status === "failure") {
        throw new Error(response.message);
      } else {
        showSuccessToast(response.message);
        setIsOpen(false);
      }
    } catch (error) {
      console.log({ error });
      showErrorToast(error.message);
      setApp({ ...app, error: error.message });
    } finally {
      setApp({ ...app, loading: false });
      setPin("");
    }
  };

  return (
    <div className="flex flex-col items-center pb-6 rounded-2xl max-w-[511px] bg-white shadow-lg">
      <div className="justify-center items-center self-stretch px-16 py-6 w-full text-base font-bold text-center rounded-t-2xl text-white bg-lightBrown max-md:px-5 max-md:max-w-full">
        PIN
      </div>
      <div className="space-y-7 flex flex-col items-center">
        <div className="flex gap-4 px-12 mt-12 max-md:mt-10">
          <PinCode length={4} setValue={setPin} mask={true} />
        </div>
        {app.error && <p className="text-sm text-red-500">{app.error}</p>}
        <Button onClick={handleSetPin} isLoading={app.loading}>
          Set PIN
        </Button>
      </div>
    </div>
  );
};

export default SetPinCard;
