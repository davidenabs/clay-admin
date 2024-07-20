import { useCallback } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const useSignInUser = () => {
  const signIn = useSignIn();

  const signInUser = useCallback(
    async (data) => {
      try {
        const signUserIn = signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: { user: data.user, profile: data.profile },
        });

        if (signUserIn) {
          return true;
        } else {
          throw new Error("Unable to sign you in");
        }
      } catch (error) {
        throw error;
      }
    },
    [signIn]
  );

  return signInUser;
};

export default useSignInUser;
