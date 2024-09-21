import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import Button from "../../../components/form/button";
import PopupModal from "../../../components/popup";
import createApiManager from "../../../managers/apiManager";
import { formatDate } from "../../../utils/dateUtils";
import { useAtom } from "jotai";
import { appAtom } from "../../../atoms/app";
import { Loader, Select } from "rizzui";
import InputField from "../../../components/form/input";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import StaffModel, { IStaff } from "../../../models/staff";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import Gravatar from "react-gravatar";
import { formatNumberWithCommas, formatString } from "../../../utils/helpers";
import { userAccountAtom } from "../../../atoms/userAccountAtom";
import SetPinCard from "./components/setPinCard";
import SelectField from "../../../components/form/select";
import { Employer } from "../../../models/employer";
import { images } from "../../../assets";

const StaffProfile = () => {
  const [staff, setStaff] = useState<StaffModel | null>(null);
  const [profile, setProfile] = useState<{} | null>(null);
  const [loading] = useAtom(apiLoadingAtom);
  const [error, setError] = useState({
    pin: "",
    percentageCharge: "",
    limit: "",
    cardholderName: "",
    fullName: "",
    employerId: "",
    status: "",
  });
  const [app, setApp] = useAtom(appAtom);
  const [isOpen, setIsOpen] = useState(false);
  const apiManager = createApiManager();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useAtom(userAccountAtom);
  const [account, setAccount] = useState({});
  const [card, setCard] = useState({});
  const [qrCode, setQrCode] = useState({});
  const [isOpenId, setIsOpenId] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenCardData, setIsOpenCardData] = useState(false);
  const [employers, setEmployers] = useState<Employer[] | []>([]);
  const [status, setStatus] = useState(null);
  const [employerId, setEmployerId] = useState("Select Organization");

  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const itemsPerPage = 10;
  const newUserId = formatString(userId);
  const fetchStaffDetails = async (page: number = 1) => {

    // console.log(newUserId);
    try {
      const staffResponse = await apiManager.getStaffById(newUserId);
      setStaff(new StaffModel(staffResponse.data));
      setProfile(staffResponse.data.profile);

      const accountResponse = await apiManager.getAccountByUserId(newUserId);
      setAccount(accountResponse.data.result.data.account);

      const cardResponse = await apiManager.getCardByUserId(newUserId);
      setCard(cardResponse.data.card);

      const employersResponse = await apiManager.getEmployers(
        page,
        itemsPerPage
      );
      setEmployers(employersResponse.data.users);
      setQrCode(cardResponse.data.qrCode);
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
      () => apiManager.fundAccount({ staffId: newUserId }),
      "Account funded successfully"
    );
  };

  const assignCard = () => {
    // alert(newUserId)
    handleApiAction(
      () =>
        apiManager.createCard({
          userId: newUserId,
          cardholderName: formState.cardholderName || staff?.fullName,
          isActive: true,
        }),
      "Card assigned successfully"
    );
  };

  const updateUser = () => {
    handleApiAction(
      () =>
        apiManager.updateStaff(newUserId, {
          fullName: formState.fullName || staff?.fullName,
          status: status?.["value"] || staff?.status,
          employerId: employerId?.["value"] || staff?.employerId,
        }),
      "User updated successfully"
    );
    setIsOpenEdit(false);
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              /* Add any additional styles here */
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
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
        value: `${staff?.phoneNumber}`,
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

  const printableCard = loading ? ('')
    : card === ""
      ? ('')
      : (<>
        <div
        ref={printRef}
          className="relative bg-cover bg-center p-5 rounded-lg w-[1011px] h-[639px]"
          style={{ backgroundImage: "url(" + images.cardBg + ")" }}
        >
          <div className="flex gap-3 ">
            <div className="w-100 h-100 pl-10 pt-[120px]">
              {qrCode["qrCode"] ? (
                <img src={qrCode["qrCode"]} alt="QR Code" />
              ) : (
                "Cannot fetch QR code"
              )}
            </div>
            <div className="absolute bottom-3 left-[101px]">
              <span className="font-n text-[50px] font-disket text-gray-700">{card?.["cardholderName"]}</span>
            </div>
          </div>

        </div></>)
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
          title: "Card Name",
          value: card?.["cardholderName"],
        },
        {
          title: "Exp Date",
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

  const employerOptions = employers.map((employer) => ({
    label: employer?.profile?.organizationName,
    value: employer?.user?.publicId,
  }));

  const formField = (
    <>
      <div className="flex flex-col">
        {/* {value} */}
        <div className="border rounded-lg p-2 w-full space-y-2">
          {/* <InputField
            label="Full name"
            name="Card Holder Name"
            value={`${formState.fullName || staff?.fullName}`}
            onChange={(e) => updateFormState("fullName", e.target.value)}
            required={true}
            placeholder={"John Doe"}
            error={error.cardholderName}
            className={"!w-full"}
            disabled={loading}
            type={"text"}
            autoComplete={"off"}
          /> */}

          <SelectField
            label="Organization"
            options={employerOptions}
            value={employerId}
            onChange={setEmployerId}
          />

          <SelectField
            label="Profile status"
            options={[
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            value={status || staff?.status.toUpperCase()}
            onChange={setStatus}
          />
        </div>
        <div className="flex justify-end mt-10">
          {/* <Button
            className="!mt-0 !rounded-md !px-0 !w-[80px] !bg-red-700"
            isLoading={loading}
            onClick={assignCard}
          >
            Delete
          </Button> */}
          <Button
            className="!mt-0 !rounded-md !px-0 !w-[80px]"
            isLoading={loading}
            onClick={updateUser}
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );

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
              <div className="flex gap-3 justify-between items-startself-start pb-2 mt-7 ml-0 max-md:flex-wrap">
                <div className="flex flex-col mt-2 max-md:max-w-full">
                  <div className="text-2xl font-semibold tracking-tight leading-8 max-md:max-w-full">
                    {staff?.fullName}
                  </div>
                  <div className="text-sm leading-5 text-clayGray max-md:max-w-full">
                    {staff?.publicId}
                  </div>
                </div>

                <Button
                  isLoading={app.loading}
                  className="!mt-0 !rounded-md !px-0 w-full"
                  onClick={() => setIsOpenEdit(true)}
                >
                  Edit User
                </Button>
              </div>
              <div className="self-center mt-5 w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex gap-10 w6/12 max-md:w-full">
                    <div>
                      {profile?.["profilePhotoPath"] ? (
                        <img
                          src={profile?.["profilePhotoPath"]}
                          alt=""
                          className="w-[320px]"
                        />
                      ) : (
                        <Gravatar email={staff?.email} size={320} />
                      )}
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
                  <div className="flex flex-col ml-5 w6/12 max-md:ml-0 max-md:w-full">
                    <div className="w-full">
                      <div className="font-semibold">User Identity</div>
                      <div className="font-normal mt-5">
                        ID Type:{" "}
                        <span className="text-gray-500">
                          {profile?.["idType"] || "No ID type yet"}
                        </span>
                      </div>
                      <div className="font-normal mt-2 flex gap-2">
                        <div>ID File:</div>
                        {profile?.["idFile"] ? (
                          <div className="border rounded-lg text-center w-[300px] h-[150px overflow-hidden">
                            <img
                              src={profile?.["idFile"]}
                              alt=""
                              className="cursor-pointer"
                              onClick={() => setIsOpenId(true)}
                            />
                          </div>
                        ) : (
                          <div className="text-gray-500">
                            No ID file uploaded yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PopupModal isOpen={isOpenId} setIsOpen={setIsOpenId}>
                <div className="bg-white p-4 rounded-lg w-full md:w-[500px]">
                  <div className=" flex flex-col items-end">
                    <button
                      onClick={() => setIsOpenId(false)}
                      className="item-right mb-2"
                    >
                      &#x2715;
                    </button>
                  </div>
                  <div className=" flex justify-center">
                    <img
                      src={profile?.["idFile"]}
                      alt="Profile"
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              </PopupModal>

              <PopupModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit}>
                <div className="bg-white p-4 rounded-lg w-full md:w-[500px]">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-semibold tracking-tight leading-8">
                      Edit user profile
                    </div>
                    <button
                      className="text-sm leading-5 text-clayGray hover:text-clayBlue transition ease-in-out duration-300"
                      onClick={() => setIsOpenEdit(false)}
                    >
                      &#x2715;
                    </button>
                  </div>
                  <div className="mt-5">{formField}</div>
                </div>
              </PopupModal>

              <PopupModal isOpen={isOpenCardData} setIsOpen={setIsOpenCardData}>
                <button onClick={handlePrint} className="mb-5 p-2 bg-blue-500 text-white rounded">
                  Print
                </button>
                {printableCard}
              </PopupModal>
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
                            The account will be funded to the card limit
                          </p>
                        </div>
                        <div className="flex gap-2 items-center self-center">
                          {/*  <InputField
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
                          /> */}
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
                            {/* <InputField
                              label=""
                              name="Card Holder Name"
                              value={`${staff?.fullName}`}
                              // onChange={(e) =>
                              //   updateFormState(
                              //     "cardholderName",
                              //     e.target.value
                              //   )
                              // }
                              required={true}
                              placeholder={"John Doe"}
                              error={error.cardholderName}
                              className={"!w-full mb-2"}
                              disabled={app.loading}
                              type={"text"}
                              autoComplete={"off"}
                            /> */}
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
                            <div className="flex gap-3 justifybetween">
                              <div className="">
                                <div className="font-normal mt-5">Set PIN</div>
                                <div className="flex gap-2 items-center self-center">
                                  <div>
                                    <Button
                                      className="!mt-0 !rounded-md !px-0 !w-[88px]"
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
                                <div className="font-normal mt-5">
                                  Delete Card
                                </div>
                                <div className="flex gap-2 items-center self-center">
                                  <div>
                                    <Button
                                      className="!mt-0 !rounded-md !px-0 !w-[88px] !bg-red-700"
                                      isLoading={app.loading}
                                      onClick={() => setIsOpen(true)}
                                      disabled={
                                        card?.["pin"] && card?.["pin"] !== ""
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="">
                                <div className="font-normal mt-5">
                                  View Card
                                </div>
                                <div className="flex gap-2 items-center self-center">
                                  <div>
                                    <Button
                                      className="!mt-0 !rounded-md !px-0 !w-[88px] !bg-green-700"
                                      isLoading={app.loading}
                                      onClick={() => setIsOpenCardData(true)}
                                    >
                                      View
                                    </Button>
                                  </div>
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
