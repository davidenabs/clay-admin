import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import useNavigateTo from "./useNavigateTo";

const useSignOutUser = () => {
  const signOut = useSignOut();
  const { navigateToLogin } = useNavigateTo();

  const handleSignOut = () => {
    signOut();
    navigateToLogin();
  };

  return { handleSignOut };
};

export default useSignOutUser;
