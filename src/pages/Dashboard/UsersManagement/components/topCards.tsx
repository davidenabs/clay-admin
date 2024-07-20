import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className="flex justify-between items-center p-6 rounded-lg shadow-lg py-10 px-5 bg-white h-6">
      <div
        className={`self-center text-${color} text-base lg:text-2xl font-bold`}
      >
        {title} <br /> {value}
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#8A92A6"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

function TopCards(props) {
  const { staffs, employers, merchants, admins } = props;
  const data = [
    {
      title: "Employers",
      value: staffs,
      color: "lightBrown",
    },
    {
      title: "Staffs",
      value: employers,
      color: "yellow-400",
    },
    {
      title: "Merchants",
      value: merchants,
      color: "green-600",
    },
    // {
    //   title: "Admin",
    //   value: admins,
    //   color: "red-500",
    // },
  ];

  return (
    <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 md:gap-x-2 lg:gap-8">
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}

export default TopCards;
