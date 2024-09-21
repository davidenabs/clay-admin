import * as React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="z-10 flex flex-col px-16  my-auto mx-auto w-[564px] ">
      <div className="text-[100px] md:text-[200px] font-bold text-center text-brown">
        404
      </div>
      <p className="text-center text-gray-400 mt-3">
        Oops! Sorry this page was not found!
        <button
          type="button"
          onClick={goBack}
          className="flex gap-3 mx-auto text-gray-500 underline"
        >
          <div className="my-auto">Go Back</div>
        </button>
      </p>
    </div>
  );
};

export default PageNotFound;
