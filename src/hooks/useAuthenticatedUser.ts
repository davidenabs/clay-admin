import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const useAuthenticatedUser = () => {
  const auth: any = useAuthUser();
  const header: any = useAuthHeader();
  const user = auth.user;
  return { user, header };
};

export default useAuthenticatedUser;
