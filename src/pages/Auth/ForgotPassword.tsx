import React from "react";
import InputField from "../../components/form/input";
import Button from "../../components/form/button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="z-10 flex flex-col px-16 pt-20 pb-10 my-auto mx-auto w-[564px] rounded-lg shadow-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 text-4xl font-medium text-center text- max-md:mt-10">
        Hi ! Oyinkansola
      </div>
      <div className="mt-4 text-base text-center text-clayGray">
        Enter your password to access the admin.
      </div>
      {/* <form action="" method="post"> */}
        <InputField label="Password" />

        <div className="flex flex-col mx-auto items-center">
         <Link to={'/reset-password'}>
         <Button>Login</Button></Link>
        </div>
      {/* </form> */}
    </div>
  );
};

export default ForgotPassword;
