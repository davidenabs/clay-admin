import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../assets";

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex gap-4 self-start text-sm font-medium leading-5 max-md:flex-wrap">
      <button
        type="button"
        onClick={goBack}
        className="flex gap-3 my-auto text-gray-500"
      >
        <img
          src={images.arrowBackBlackWithBorderIcon}
          className="shrink-0 w-6 border border-gray-200 border-solid rounded-sm aspect-square"
        />
        <div className="my-auto">Go Back</div>
      </button>
      <div className="flex gap-1 py-2.5 text-clayGray">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-1 whitespace-nowrap">
              <div className={item.isActive ? "text-lightBrown font-bold" : ""}>
                {item.name}
              </div>
              {index !== items.length - 1 && (
                <div className="text-center">/</div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
