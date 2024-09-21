import React from "react";
import { images } from "../../../assets";
import DashboardCard from "./dashboard-card";
import { formatNumber } from "../../../utils/helpers";
import useFetchStaffs from "../../../hooks/useFetchStaffs";
import useFetchStaffsTransactions from "../../../hooks/useFetchStaffsTransactions";
import activeLoan from "../../../hooks/useFetchEmployerLoan";

type Props = {};

const DashboardCardCounter = (props: Props) => {
  const { staffs, isLoading, totalPages } = useFetchStaffs();
  const { transactions, tLoading, tTotalPages } = useFetchStaffsTransactions();
  const { loan, lLoading } = activeLoan();

  const cardData = [
    {
      iconSrc: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ffffff"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      ),
      value: isLoading ? "0" : `${formatNumber(staffs.itemCount || 0)}`,
      label: "Total Number of Staff",
      bgColor: "bg-[#37474F]",
      route: "/staff-management",
    },
    {
      iconSrc: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ffffff"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
      value: tLoading ? "0" : `${formatNumber(transactions?.meta?.itemCount || 0)}`,
      label: "Orders",
      bgColor: "bg-[#F7CB9B]",
      route: "/loan-management/staff-transaction-history",
    },
    {
      iconSrc: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ffffff"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      value: lLoading ? "0" : `${formatNumber(0)}`,
      label: "Repayment Balance",
      bgColor: "bg-[#FFA5A5]",
      route: "/loan-management",
    },
    {
      iconSrc: (
        <svg
          viewBox="0 0 37 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
        >
          <path
            d="M34.3998 28.9619C33.2512 22.0515 29.6756 16.9057 26.5672 13.8833C25.6627 13.0037 25.2104 12.564 24.2114 12.157C23.2123 11.75 22.3536 11.75 20.6361 11.75H16.8639C15.1464 11.75 14.2877 11.75 13.2886 12.157C12.2896 12.564 11.8373 13.0037 10.9328 13.8833C7.82443 16.9057 4.24881 22.0515 3.10022 28.9619C2.24563 34.1035 6.98872 38 12.2896 38H25.2104C30.5113 38 35.2544 34.1035 34.3998 28.9619Z"
            fill="white"
            stroke="white"
            style={{
              fill: "white",
              fillOpacity: 1,
              stroke: "white",
              strokeOpacity: 1,
            }}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M10.4491 7.27502C10.088 6.74952 9.56473 6.03624 10.6457 5.87358C11.7569 5.70639 12.9106 6.467 14.04 6.45137C15.0616 6.43722 15.5822 5.98409 16.1406 5.33709C16.7286 4.65581 17.6391 3 18.75 3C19.8609 3 20.7714 4.65581 21.3594 5.33709C21.9178 5.98409 22.4384 6.43722 23.46 6.45137C24.5894 6.467 25.7431 5.70639 26.8543 5.87358C27.9353 6.03624 27.4119 6.74952 27.0509 7.27502L25.4185 9.65112C24.7201 10.6676 24.371 11.1758 23.6403 11.4629C22.9096 11.75 21.9653 11.75 20.0769 11.75H17.4232C15.5347 11.75 14.5904 11.75 13.8597 11.4629C13.129 11.1758 12.7799 10.6676 12.0815 9.65112L10.4491 7.27502Z"
            fill="white"
            stroke="white"
            style={{
              fill: "white",
              fillOpacity: 1,
              stroke: "white",
              strokeOpacity: 1,
            }}
            strokeWidth="6"
          />
          <path
            d="M19.5978 19.75C19.5978 19.1977 19.1501 18.75 18.5978 18.75C18.0455 18.75 17.5978 19.1977 17.5978 19.75L19.5978 19.75ZM17.5978 32C17.5978 32.5523 18.0455 33 18.5978 33C19.1501 33 19.5978 32.5523 19.5978 32H17.5978ZM20.7237 22.9801C21.0579 23.4198 21.6853 23.5053 22.1249 23.1711C22.5646 22.8369 22.6501 22.2096 22.3159 21.7699L20.7237 22.9801ZM16.3492 28.9118C15.9377 28.5434 15.3055 28.5785 14.9371 28.99C14.5688 29.4016 14.6039 30.0338 15.0154 30.4021L16.3492 28.9118ZM18.5978 24.6988C17.4449 24.6988 16.8527 24.5131 16.5696 24.3224C16.3711 24.1887 16.25 24.0079 16.25 23.5815H14.25C14.25 24.5194 14.5855 25.3973 15.4522 25.9811C16.2343 26.508 17.316 26.6988 18.5978 26.6988V24.6988ZM16.25 23.5815C16.25 23.2918 16.407 22.9474 16.8243 22.6395C17.2412 22.3319 17.865 22.1114 18.5978 22.1114V20.1114C17.4817 20.1114 16.4315 20.4438 15.6368 21.0302C14.8425 21.6163 14.25 22.507 14.25 23.5815H16.25ZM21.25 28.169C21.25 28.675 21.0475 28.979 20.6654 29.2085C20.2226 29.4744 19.5154 29.6392 18.5978 29.6392V31.6392C19.6973 31.6392 20.8162 31.451 21.6952 30.923C22.6349 30.3585 23.25 29.4274 23.25 28.169H21.25ZM18.5978 26.6988C19.7588 26.6988 20.4304 26.8749 20.7907 27.1099C21.061 27.2861 21.25 27.5528 21.25 28.169H23.25C23.25 27.0208 22.8303 26.0524 21.8832 25.4347C21.0261 24.8756 19.8716 24.6988 18.5978 24.6988V26.6988ZM19.5978 21.1114L19.5978 19.75L17.5978 19.75L17.5978 21.1114L19.5978 21.1114ZM17.5978 30.6392V32H19.5978V30.6392H17.5978ZM18.5978 22.1114C19.6098 22.1114 20.378 22.5253 20.7237 22.9801L22.3159 21.7699C21.5153 20.7166 20.096 20.1114 18.5978 20.1114V22.1114ZM18.5978 29.6392C17.6031 29.6392 16.7985 29.3139 16.3492 28.9118L15.0154 30.4021C15.8995 31.1933 17.2106 31.6392 18.5978 31.6392V29.6392Z"
            fill="#130F26"
            style={{
              fill: "#130F26",
              fillOpacity: 1,
            }}
          />
        </svg>
      ),
      value: `₦${formatNumber(0)}`,
      label: "Aggregated Credit Limit",
      bgColor: "bg-[#444683]",
      route: "",
    },
  ];

  return (
    <div className="z-10 -mt-10 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-6">
      {cardData.map((item, key) => (
        <DashboardCard
          key={key}
          iconSrc={item.iconSrc}
          value={item.value}
          label={item.label}
          bgColor={item.bgColor}
          route={item.route}
        />
      ))}
    </div>
  );
};

export default DashboardCardCounter;
