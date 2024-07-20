import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const useAuthStatus = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated;
};

export default useAuthStatus;
