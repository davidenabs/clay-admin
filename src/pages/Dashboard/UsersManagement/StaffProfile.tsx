import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import Button from "../../../components/form/button";
import PopupModal from "../../../components/popup";
import createApiManager from "../../../managers/apiManager";
import { formatDate } from "../../../utils/dateUtils";
import { useAtom } from "jotai";
import { appAtom } from "../../../atoms/app";
import { Loader } from "rizzui";
import InputField from "../../../components/form/input";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import StaffModel, { IStaff } from "../../../models/staff";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import Gravatar from "react-gravatar";
import { formatNumberWithCommas } from "../../../utils/helpers";
import { userAccountAtom } from "../../../atoms/userAccountAtom";
import SetPinCard from "./components/setPinCard";

const StaffProfile = () => {
  const [staff, setStaff] = useState<StaffModel | null>(null);
  const [loading] = useAtom(apiLoadingAtom);
  const [error, setError] = useState({
    pin: "",
    percentageCharge: "",
    limit: "",
    cardholderName: "",
  });
  const [app, setApp] = useAtom(appAtom);
  const [isOpen, setIsOpen] = useState(false);
  const apiManager = createApiManager();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useAtom(userAccountAtom);
  const [account, setAccount] = useState({});
  const [card, setCard] = useState({});

  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fetchStaffDetails = async () => {
    try {
      const staffResponse = await apiManager.getStaffById(userId);
      setStaff(new StaffModel(staffResponse.data));

      const accountResponse = await apiManager.getAccountByUserId(userId);
      setAccount(accountResponse.data.result.data.account);

      const cardResponse = await apiManager.getCardByUserId(userId);
      setCard(cardResponse.data.card);
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }
  };

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const handleApiAction = async (apiCall, successMessage) => {
    try {
      setApp((prev) => ({ ...prev, loading: true }));
      const response = await apiCall();
      if (response.status === "failure") {
        throw new Error(response.message);
      }
      showSuccessToast(successMessage);
      fetchStaffDetails();
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setApp((prev) => ({ ...prev, loading: false }));
    }
  };

  const setLimit = () => {
    if (!formState.limit) {
      showErrorToast("The amount is required.");
      return;
    }
    handleApiAction(
      () =>
        apiManager.setLimit({
          cardNumber: card["cardNumber"],
          limit: parseInt(`${formState.limit}`, 10),
        }),
      "Limit set successfully"
    );
  };

  const fundAccount = () => {
    handleApiAction(
      () => apiManager.fundAccount({ staffId: userId }),
      "Account funded successfully"
    );
  };

  const assignCard = () => {
    handleApiAction(
      () =>
        apiManager.createCard({
          userId,
          cardholderName: formState.cardholderName || staff?.fullName,
          isActive: true,
        }),
      "Card assigned successfully"
    );
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
        {
          title: "BVN",
          value: staff?.bvnData?.bvn || "N/A",
        },
      ];

  const accountData = loading
    ? []
    : [
        {
          title: "ID",
          value: account?.["_id"],
        },
        {
          title: "Balance",
          value: `₦${formatNumberWithCommas(account?.["balance"])}`,
        },
        {
          title: "Created Date",
          value: formatDate(account?.["createdAt"] /* , "DD MMM, YYYY" */),
        },
      ];

  const cardData = loading
    ? []
    : card === ""
    ? []
    : [
        {
          title: "Card Number",
          value: card?.["cardNumber"],
        },
        {
          title: "Card Holder Name",
          value: card?.["cardholderName"],
        },
        {
          title: "Expiration Date",
          value: formatDate(card?.["expirationDate"] /* , "DD MMM, YYYY" */),
        },
        {
          title: "Limit",
          value: `₦${formatNumberWithCommas(card?.["limit"])}`,
        },
        {
          title: "Status",
          value: card?.["isActive"] ? "Active" : "Not Active",
        },
        {
          title: "Created Date",
          value: formatDate(card?.["createdAt"] /* , "DD MMM, YYYY" */),
        },
      ];

  return (
    <div className="space-y-6">
      <div className="mx-10 mt-10 max-md:max-w-full">
        <PopupModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SetPinCard setIsOpen={setIsOpen} cardNumber={card["cardNumber"]} />
        </PopupModal>
        <div className="flex flex-col mb-10 py-5 px-12 max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white !min-h-[450px]">
          {/* breadcrumb */}
          <Breadcrumb
            items={[
              { name: "Dashboard" },
              { name: "User Management" },
              { name: "Profile", isActive: true },
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
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w6/12 max-md:ml-0 max-md:w-full"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mx-10 my10 max-md:max-w-full">
        <div className="flex flex-col mb-10 py-5 px-12 max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white !min-h-[450px]">
          {loading ? (
            <div className="flex justify-center items-center my-auto">
              <Loader variant="pulse" />
            </div>
          ) : (
            <>
              <div className="flex gap-3 items-start self-start pb-2 mt-7 ml-0 max-md:flex-wrap">
                <div className="flex flex-col mt-2 max-md:max-w-full">
                  <div className="text-xl font-semibold tracking-tight leading-8 max-md:max-w-full">
                    Account & Card Information
                  </div>
                  <div className="text-sm leading-5 text-clayGray max-md:max-w-full">
                    {/* {staff?.publicId} */}
                  </div>
                </div>
              </div>
              <div className="self-center mt-5 w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex gap-10 w-6/12 max-md:w-full">
                    <div className="w-full">
                      <div className="font-semibold">Account</div>
                      <div className="grid grid-cols-3 gap-0 space-y-2 text-[#333543]">
                        {accountData.map((item, i) => (
                          <React.Fragment key={i}>
                            <div className="col-span-1">{item.title}:</div>
                            <div className="col-span-1">{item.value}</div>
                            <div></div>
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="">
                        <div className="font-normal mt-5">
                          Percentage (optional).
                          <p className="text-sm text-clayGray">
                            It will charge 10% of the card limit
                          </p>
                        </div>
                        <div className="flex gap-2 items-center self-center">
                          <InputField
                            label=""
                            name="bvn"
                            // value={formState.percentageCharge}
                            onChange={(e) =>
                              updateFormState(
                                "percentageCharge",
                                e.target.value
                              )
                            }
                            // onChange={(e: any) =>
                            //   updatePercentageChard(e.target.value)
                            // }
                            required={true}
                            placeholder={"0.1"}
                            error={error.percentageCharge}
                            className={"!w-[66px]"}
                            disabled={app.loading || true}
                            type={"number"}
                            autoComplete={"off"}
                          />
                          <div>
                            <Button
                              className="!mt-0 !rounded-md !px-0 w-full"
                              isLoading={app.loading}
                              onClick={fundAccount}
                            >
                              Fund Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="w-full">
                      <div className="font-semibold">Card</div>
                      {Object.keys(card).length === 0 ? (
                        <>
                          <div className="font-normal">Assign Card</div>

                          <div className="flex flex-col">
                            <InputField
                              label=""
                              name="Card Holder Name"
                              value={`${staff?.fullName}`}
                              onChange={(e) =>
                                updateFormState(
                                  "cardholderName",
                                  e.target.value
                                )
                              }
                              required={true}
                              placeholder={"John Doe"}
                              error={error.cardholderName}
                              className={"!w-full mb-2"}
                              disabled={app.loading}
                              type={"text"}
                              autoComplete={"off"}
                            />
                            <div>
                              <Button
                                className="!mt-0 !rounded-md !px-0 w-full"
                                isLoading={app.loading}
                                onClick={assignCard}
                              >
                                Assign Card
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-3 gap-0 space-y-4 text-[#333543]">
                            {cardData.map((item, i) => (
                              <React.Fragment key={i}>
                                <div className="col-span-1">{item.title}:</div>
                                <div className="col-span-1">{item.value}</div>
                                <div></div>
                              </React.Fragment>
                            ))}
                          </div>

                          <div className="space-y-3 border-separate">
                            <div className="">
                              <div className="font-normal mt-5">Set PIN</div>
                              <div className="flex gap-2 items-center self-center">
                                <div>
                                  <Button
                                    className="!mt-0 !rounded-md !px-0"
                                    isLoading={app.loading}
                                    onClick={() => setIsOpen(true)}
                                    disabled={
                                      card?.["pin"] && card?.["pin"] !== ""
                                    }
                                  >
                                    Set PIN
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <div className="font-normal mt-5">Set limit</div>
                              <div className="flex gap-2 items-center self-center">
                                <InputField
                                  label=""
                                  name="limit"
                                  value={formState.limit || 10000}
                                  onChange={(e) =>
                                    updateFormState("limit", e.target.value)
                                  }
                                  required={true}
                                  placeholder={"Enter an amount"}
                                  error={error.limit}
                                  className={"w-[546px]"}
                                  type={"number"}
                                />
                                <div>
                                  <Button
                                    className="!mt-0 !rounded-md !px-0"
                                    isLoading={app.loading}
                                    onClick={setLimit}
                                  >
                                    Set Limit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-10">&nbsp;</div>
    </div>
  );
};

export default StaffProfile;
