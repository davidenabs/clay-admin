import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { images } from "../../assets";
import InputField from "../../components/form/input";
import Button from "../../components/form/button";
import {
  initialFormValues,
  loginFormErrorValuesAtom,
  loginFormValuesAtom,
} from "../../atoms/loginFormAtoms";
import {
  apiErrorAtom,
  apiLoadingAtom,
  apiSuccessAtom,
} from "../../atoms/apiAtoms";
import config from "../../config";
import useApi from "../../hooks/useApi";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import loginFormValidation from "../../utils/validations/LoginFormValidation";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useNavigateTo from "../../hooks/useNavigateTo";
import useAuthStatus from "../../hooks/useAuthStatus";
import createApiManager from "../../managers/apiManager";

const Login = () => {
  const isAuthenticated = useAuthStatus();
  const [formValues, setFormValues] = useAtom(loginFormValuesAtom);
  const [loading] = useAtom(apiLoadingAtom);
  const [error, setError] = useAtom(apiErrorAtom);
  const [success, setSuccess] = useAtom(apiSuccessAtom);
  const [errors, setErrors] = useAtom(loginFormErrorValuesAtom);
  const signIn = useSignIn();
  const { navigateToDashboard } = useNavigateTo();
  const apiManager = createApiManager();

  // const url = `${config.base_uri}/auth/employer/login`;
  // const { fetchData } = useApi(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // });

  // useEffect(() => {
  //   // if (isAuthenticated) {
  //   //   navigateToDashboard();
  //   // }
  // }, [isAuthenticated, navigateToDashboard]);

  const signInUser = useCallback(
    async (data: any) => {
      try {
        const signUserIn = signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: { user: data.user, profile: data.profile },
        });

        if (signUserIn) {
          navigateToDashboard();
        } else {
          throw new Error("Unable to sign you in");
        }
      } catch (error) {
        showErrorToast(error.message);
      }
    },
    [signIn, navigateToDashboard]
  );

  // useEffect(() => {
    
  //   setError(null);
  //   setSuccess(null);
  // }, [success,setError,
  //   setSuccess,
  //    error, setFormValues, signInUser]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === "checkbox" ? checked : value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    },
    [setFormValues, setErrors]
  );

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const validationErrors = loginFormValidation(formValues);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors as { email: string; password: string });
        return;
      }

      try {
        const response = await apiManager.login({
          email: formValues.email,
          password: formValues.password,
        });
        
        if (response["status"] === "success") {
          showSuccessToast("Login successful!");
          setFormValues(initialFormValues);
          signInUser(response["data"]);
        } else {
          showErrorToast(response["message"]);
        }
      } catch (error) {
        showErrorToast('Invalid Credentials');
        // setError(error);
      }
    },
    [formValues, setError]
  );

  return (
    <div className="z-10 flex flex-col px-16 pt-20 pb-10 my-auto mx-auto w-[564px] rounded-lg shadow-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 text-4xl font-semibold text-center text-brown max-md:mt-10">
        Sign In
      </div>
      <div className="mt-4 text-base text-center text-clayGray">
        Sign in to stay connected.
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder={"clay@gmail.com"}
          error={errors.email}
          className={""}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder={"********"}
          error={errors.password}
          className={""}
        />

        <div className="flex gap-5 justify-between self-stretch mt-4 w-full text-base leading-7 max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 text-clayGray">
            <input
              type="checkbox"
              className="shrink-0 my-auto w-4 h-4 rounded-sm border border-gray-400 border-solid shadow-sm bg-[color(display-p3_1_1_1)]"
            />
            <a href="#">Remember me?</a>
          </div>
          <Link to="/forgot-password" className="text-brown">
            Forgot Password
          </Link>
        </div>
        <div className="flex flex-col mx-auto items-center">
          <Button type="submit" disabled={loading} isLoading={loading}>
            Sign in
          </Button>
        </div>
      </form>
      {/* sign in with other accounts */}
      <div className="flex flex-col text-center">
        <div className="mt-4 text-base leading-7 text-[color(display-p3_0.1373_0.1765_0.2588)]">
          or sign in with other accounts?
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <img
            src={images.googleIcon}
            className="shrink-0 w-6 aspect-square fill-[color(display-p3_1_1_1)]"
            alt="Google"
          />
          <img
            src={images.facebookIcon}
            className="shrink-0 w-6 aspect-square"
            alt="Facebook"
          />
          <img
            src={images.instagramIcon}
            className="shrink-0 w-6 aspect-square"
            alt="Instagram"
          />
          <img
            src={images.linkedinIcon}
            className="shrink-0 w-6 aspect-square"
            alt="LinkedIn"
          />
        </div>
        <div className="mt-4 text-base leading-7 text-[color(display-p3_0.2941_0.149_0.051)]">
          <span className="text-slate-800">Don’t have an account? </span>
          <Link to="/register" className="text-brown">
            Click here to sign up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
