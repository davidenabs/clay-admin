import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { images } from "../../../assets";
import Breadcrumb from "../../../components/breadcrumb";
import Button from "../../../components/form/button";
import PopupModal from "../../../components/popup";
import createApiManager from "../../../managers/apiManager";
import { formatDate } from "../../../utils/dateUtils";
import OTPInput from "./components/otpCard";
import { useAtom } from "jotai";
import { appAtom } from "../../../atoms/app";
import { Loader } from "rizzui";
import InputField from "../../../components/form/input";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { verificationFormStateAtom } from "../../../atoms/staffVerificationAtom";
import StaffModel, { IStaff } from "../../../models/staff";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import Gravatar from "react-gravatar";

const StaffProfile = () => {
  const [staff, setStaff] = useState<StaffModel | null>(null);
  const [loading] = useAtom(apiLoadingAtom);
  const [error, setError] = useState({
    bvn: "",
    phoneNumber: "",
  });
  const [app, setApp] = useAtom(appAtom);
  const [isOpen, setIsOpen] = useState(false);
  const apiManager = createApiManager();
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useAtom(verificationFormStateAtom);

  const togglePhoneNumberInput = () => {
    setFormState((prevState) => ({
      ...prevState,
      showPhoneNumberInput: !prevState.showPhoneNumberInput,
    }));
  };

  const updateMethods = (newMethods) => {
    setFormState((prevState) => ({
      ...prevState,
      methods: newMethods,
    }));
  };

  const updatePhoneNumber = (newPhoneNumber) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: newPhoneNumber,
    }));
  };

  const updateBvn = (newBvn) => {
    setFormState((prevState) => ({
      ...prevState,
      bvn: newBvn,
    }));
  };

  const updateSessionId = (sessionId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      sessionId,
    }));
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        // setApp({ ...app, loading: true });
        const fetchedStaff = await apiManager.getStaffById(staffId);
        const data: IStaff = fetchedStaff.data;
        const staffModel = new StaffModel(data);
        setStaff(staffModel);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        // setApp({ ...app, loading: false });
      }
    };

    fetchStaff();
  }, [staffId, setApp]);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      userId: staff?.publicId || "",
      bvn: staff?.bvnData?.bvn || "",
    }));
  }, [setFormState, staff]);

  const verifyBvn = async () => {
    // Validate BVN input (assuming numerical check)
    if (!formState.bvn) {
      setError({ ...error, bvn: "Please enter a valid numerical BVN." });
      return;
    }

    try {
      setApp({ ...app, loading: true, error: null }); // Clear previous errors

      const response = await apiManager.verifyBvn({ bvn: formState.bvn });
      if (response.status === "failure") {
        throw Error(response.message);
      } else {
        const data = response.data;
        togglePhoneNumberInput();
        updateMethods(data.methods);
        updateSessionId(data.session_id);
      }
    } catch (error) {
      setError({ ...error, bvn: error.message });
    } finally {
      setApp({ ...app, loading: false });
    }
  };

  const requestOtp = async () => {
    if (!formState.phoneNumber) {
      setError({ ...error, bvn: "Please enter a valid phone number." });
      return;
    }
    try {
      setApp({ ...app, loading: true });
      setError({ ...error });
      const response = await apiManager.verifyOtp({
        phoneNumber: formState.phoneNumber,
        sessionId: formState.sessionId,
      });
      if (response.status === "failure") {
        throw Error(response.message);
      } else {
        showSuccessToast(response.message);
        setIsOpen(true);
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setApp({ ...app, loading: false });
    }
  };

  const data = loading
    ? []
    : [
        {
          title: "Date joined",
          value: formatDate(staff?.createdAt /* , "DD MMM, YYYY" */),
        },
        {
          title: "Mobile Number",
          value: `+234${staff?.phoneNumber}`,
        },
        {
          title: "State of Residence",
          value: staff?.bvnData?.state_of_origin || "N/A",
        },
        {
          title: "Community",
          value: staff?.bvnData?.lga_of_Residence || "N/A",
        },
      ];

  return (
    <div className="mx-10 my-10 max-md:max-w-full">
      <PopupModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <OTPInput setIsOpen={setIsOpen} />
      </PopupModal>
      <div className="flex flex-col mb-10 py-5 px-12 max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white !min-h-[450px]">
        {/* breadcrumb */}
        <Breadcrumb
          items={[
            { name: "Dashboard" },
            { name: "Staff Management" },
            { name: "Staff Confirmation", isActive: true },
          ]}
        />
        {loading ? (
          <div className="flex justify-center items-center my-auto">
            <Loader variant="pulse" />
          </div>
        ) : (
          <>
            <div className="flex gap-3 items-start self-start pb-2 mt-7 ml-0 max-md:flex-wrap">
              <div className="flex flex-col mt-2 max-md:max-w-full">
                <div className="text-2xl font-semibold tracking-tight leading-8 max-md:max-w-full">
                  {staff?.fullName}
                </div>
                <div className="text-sm leading-5 text-clayGray max-md:max-w-full">
                  {staff?.publicId}
                </div>
              </div>
            </div>
            <div className="self-center mt-5 w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex gap-10 w6/12 max-md:w-full">
                  <div>
                    {/* <img src={images.profile} className="w-[320px]" /> */}
                    <Gravatar email={staff?.email} size={320} />
                  </div>

                  <div className="w-full">
                    <div className="font-semibold">Bio</div>
                    <div className="grid grid-cols-3 gap-0 space-y-4 text-[#333543]">
                      {data.map((item, i) => (
                        <React.Fragment key={i}>
                          <div className="col-span-1">{item.title}:</div>
                          <div className="col-span-1">{item.value}</div>
                          <div></div>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="font-normal mt-5">Input BVN</div>
                    <div className="flex gap-2">
                      <InputField
                        label=""
                        name="bvn"
                        value={formState.bvn}
                        onChange={(e: any) => updateBvn(e.target.value)}
                        required={true}
                        placeholder={"Enter a valid BVN"}
                        error={error.bvn}
                        className={"w-[546px]"}
                        disabled={staff?.status === "approved" || app.loading}
                        type={"number"}
                      />
                      {app.loading && <Loader variant="threeDot" />}
                    </div>
                    {formState.showPhoneNumberInput && (
                      <InputField
                        label=""
                        name="phoneNumber"
                        value={formState.phoneNumber}
                        onChange={(e: any) => updatePhoneNumber(e.target.value)}
                        required={true}
                        placeholder={"Enter BVN's phone number"}
                        error={error.phoneNumber}
                        className={"w-[546px]"}
                        disabled={app.loading}
                        type={"number"}
                      />
                    )}
                    <div className="text-[#333543] px-5">
                      {formState.methods && (
                        <ul className="list-disc">
                          {formState.methods.map((item: any, i) => (
                            <li key={i}>
                              {item.hint} ({item.method})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mb-10">
                      {staff?.status === "approved" ? (
                        <div className="bg-[#E7F6EC] text-green-600 mt-2 w-fit px-3 py-1 rounded-full">
                          <div className="flex gap-2 items-center">
                            <img
                              src={images.checkCircleIcon}
                              className="w-[20px]"
                            />
                            User verified
                          </div>
                        </div>
                      ) : (
                        <>
                          {formState.showPhoneNumberInput ? (
                            <Button
                              isLoading={app.loading}
                              onClick={requestOtp}
                            >
                              Request OTP
                            </Button>
                          ) : (
                            <Button isLoading={app.loading} onClick={verifyBvn}>
                              Verify BVN
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w6/12 max-md:ml-0 max-md:w-full"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;
