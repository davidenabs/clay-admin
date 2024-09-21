import React, { useEffect, useState } from "react";
import { formatNumberWithCommas } from "../../../../../utils/helpers";
import { Loader } from "rizzui";
import { images } from "../../../../../assets";

function BalanceCard({ loading, activeLoan }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!loading && activeLoan) {
      const amountReceived = activeLoan["amountReceived"];
      const totalLoanAmount = activeLoan["totalLoanAmount"];

      if (
        typeof amountReceived === "number" &&
        typeof totalLoanAmount === "number"
      ) {
        setBalance(amountReceived - totalLoanAmount);
      }
    }
  }, [loading, activeLoan]);

  return (
    <div className="lg:col-span-1">
      <div className="flex flex-col px-11 pt-9 pb-16 mx-auto w-full h-full rounded-2xl shadow-sm bg-[#FFFCF9]">
        <div className="flex flex-col pb-1">
          <div className="flex gap-2.5 justify-between items-start pr-2 pb-6">
            <div className="text-2xl tracking-wide text-brown">Balances</div>
            <div className="flex justify-center items-center p-2 w-8 h-8 rounded-lg bg-lightBrown">
              <img
                src={images.plusIcon}
                className="w-4 aspect-square"
                alt="plus icon"
              />
            </div>
          </div>
          <div className="self-start ml-5 text-base tracking-wide text-brown">
            {/* Naira */}
          </div>
          <div className="self-start text-4xl font-bold text-lightBrown">
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <Loader variant="pulse" />
              </div>
            ) : (
              <>₦{formatNumberWithCommas(balance)}</>
            )}
          </div>
        </div>
        <img
          src={images.creditCard}
          className="self-center h-auto max-w-full"
          alt="credit card"
        />
      </div>
    </div>
  );
}

export default BalanceCard;
