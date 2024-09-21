import Divider from "../../../../../components/divider";
import React, { useState } from "react";
import { formatDate } from "../../../../../utils/dateUtils";
import { formatNumberWithCommas } from "../../../../../utils/helpers";
import { Button, Loader } from "rizzui";
import createApiManager from "../../../../../managers/apiManager";
import { showErrorToast } from "../../../../../utils/toast";

function NextPaymentCard({ loading, activeLoan }) {

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const apiManager = createApiManager();
console.log(activeLoan);

  const handleMakeRepayment = async () => {
    setIsPaymentLoading(true);
    try {
      const response = await apiManager.initiatePayment({
        userId: activeLoan.userId,
        loanId: activeLoan._id,
      });

      if (response.status === "success") {
        const authorizationUrl = response.data.paystackResponse.data.authorization_url;
        window.location.href = authorizationUrl; // Redirect to Paystack authorization URL
      } else {
        console.error("Payment initiation failed:", response.message);
        showErrorToast(response.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      showErrorToast(error.message);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-6  rounded-2xl shadow-lg bg-white">
      <div className="self-start px-8 lg:px-12 text-base tracking-normal leading-6 text-brown">
        Next Repayment Date
      </div>
      <Divider />
      <div className="flex gap-5 justify-between items-center  px-8 lg:px-12 mt-7 w-full font-semibold tracking-wide max-md:flex-wrap max-md:max-w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader variant="pulse" />
          </div>
        ) : (
          <>
            <div className="flex flex-col my-auto">
              <div className="text-md md:text-xl leading-7 text-brown">
                {formatDate(activeLoan["dueDate"], "MMMM d, yyyy")}
              </div>
              <div className="mt-2.5 text-sm leading-5 text-lightBrown">
                Clay Vault
              </div>
            </div>
            <div className="my-auto text-md md:text-2xl font-medium leading-8 text-blue">
              <span className="font-bold">₦</span>
              <span className="">
                {formatNumberWithCommas(activeLoan["repaymentAmount"]||0)}
              </span>
            </div>
            <Button
              type="button"
              className="text-sm rounded-2xl text-white bg-lightBrown max-md:px-5 hover:bg-lightBrown-dark hover:opacity-90 transition duration-300"
              isLoading={isPaymentLoading}
              onClick={handleMakeRepayment}
              disabled={!activeLoan["repaymentAmount"]}
            >
              Make Repayment
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default NextPaymentCard;
