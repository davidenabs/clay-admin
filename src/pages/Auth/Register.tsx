import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/form/button";
import { images } from "../../assets";
import InputField from "../../components/form/input";
import { useAtom } from "jotai";
import {
  initialFormValues,
  registerFormErrorValuesAtom,
  registerFormValuesAtom,
} from "../../atoms/registerFormAtoms";
import {
  apiErrorAtom,
  apiLoadingAtom,
  apiSuccessAtom,
} from "../../atoms/apiAtoms";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import registrationFormValidation from "../../utils/validations/RegistrationFormValidation";
import useNavigateTo from "../../hooks/useNavigateTo";
import createApiManager from "../../managers/apiManager";

const Register = () => {
  const [formValues, setFormValues] = useAtom(registerFormValuesAtom);
  const [loading] = useAtom(apiLoadingAtom);
  const [error, setError] = useAtom(apiErrorAtom);
  const [success, setSuccess] = useAtom(apiSuccessAtom);
  const [errors, setErrors] = useAtom(registerFormErrorValuesAtom);
  const { navigateToLogin } = useNavigateTo();
  const apiManager = createApiManager();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    /* pyfiw@mailinator.com */
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (success && success["status"] === "success") {
      showSuccessToast("Registration successful!");
      setFormValues(initialFormValues);
      navigateToLogin();
    } else if (error) {
      showErrorToast(error["message"]);
    }
    setError(null);
    setSuccess(null);
  }, [success, error, setError, setSuccess, setFormValues, navigateToLogin]);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const validationErrors = registrationFormValidation(formValues);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const response = await apiManager.register({
          email: formValues.email,
          password: formValues.password,
          fullName: `${formValues.firstName} ${formValues.lastName}`,
          username: formValues.email.split("@")[0],
          phoneNumber: formValues.phone,
        });
        setSuccess(response);
      } catch (error) {
        setError(error);
      }
    },
    [formValues, setError, setSuccess]
  );

  return (
    <div className="z-10 flex flex-col px-16 pt-20 pb-10 my-auto mx-auto w-fit rounded-lg shadow-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 text-4xl text-center font-medium text-brown max-md:mt-10">
        Sign Up
      </div>
      <div className="mt-4 text-base text-center text-clayGray">
        Create your Hope UI account
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-2">{error["message"]}</div>
      )}
      {success && (
        <div className="text-green-500 mt-2">Registration successful!</div>
      )}
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder={"Clay"}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder={"Africa"}
            error={errors.lastName}
          />
        </div>

        <div className="flex gap-4">
          <InputField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder={"clay@gmail.com"}
            error={errors.email}
          />
          <InputField
            label="Phone No."
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder={"08123456789"}
            error={errors.phone}
          />
        </div>

        <div className="flex gap-4">
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder={"********"}
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder={"********"}
            error={errors.confirmPassword}
          />
        </div>

        <div className="flex gap-5 justify-center mt-4 w-full textbase leading7">
          <div className="flex gap-2 text-clayGray">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formValues.agreeTerms}
              onChange={handleChange}
              className={`shrink-0 my-auto w-4 h-4 rounded-sm border ${
                errors.agreeTerms ? "border-red-400" : "border-gray-400"
              } border-solid shadow-sm `}
            />
            I agree with the terms of use
          </div>
        </div>
        <div className="flex flex-col mx-auto items-center">
          <Button type="submit" disabled={loading} isLoading={loading}>
            Sign up
          </Button>
        </div>
      </form>
      {/* sign in with other accounts */}
      <div className="flex flex-col text-center">
        <div className="mt-4 text-base leading-7 text-[color(display-p3_0.1373_0.1765_0.2588)]">
          or sign in with other accounts?
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <img src={images.googleIcon} className="shrink-0 w-6 aspect-square" />
          <img
            src={images.facebookIcon}
            className="shrink-0 w-6 aspect-square"
          />
          <img
            src={images.instagramIcon}
            className="shrink-0 w-6 aspect-square"
          />
          <img
            src={images.linkedinIcon}
            className="shrink-0 w-6 aspect-square"
          />
        </div>
        <div className="mt-4 text-base leading-7 text-[color(display-p3_0.2941_0.149_0.051)]">
          <span className="text-slate-800">Already have an Account? </span>
          <Link to="/login" className="text-brown">
            Click here to sign in.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
