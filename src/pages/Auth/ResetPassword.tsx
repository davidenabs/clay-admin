import React from "react";
import InputField from "../../components/form/input";
import Button from "../../components/form/button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="z-10 flex flex-col px-16 pt-40 pb-20 my-auto mx-auto w-[564px] rounded-lg shadow-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 text-4xl font-medium text-center text-brown max-md:mt-10">
        Reset Password
      </div>
      <div className="mt-4 text-base text-center text-clayGray">
        Enter your email address and we’ll send you an email with instructions
        to reset your password
      </div>
      {/* <form action="" method="post"> */}
      <InputField label="Email" />

      <div className="flex flex-col mx-auto items-center">
        <Link to={"/login"}>
          <Button>Reset</Button>
        </Link>
      </div>
      {/* </form> */}
    </div>
  );
};

export default ResetPassword;
