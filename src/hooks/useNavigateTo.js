import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToLoanManagementShow = (transactionId) => {
    navigate(`/loan-management/${transactionId}`);
  };

  const navigateToStaffTransactions = (staffId) => {
    navigate(`/loan-management/user/${staffId}`);
  };

  const navigateToStaffProfile = (staffId) => {
    navigate(`/user-management/${staffId}`);
  };

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

  return {
    navigateToLogin,
    navigateToHome,
    navigateToDashboard,
    navigateToLoanManagementShow,
    navigateToStaffTransactions,
    navigateToStaffProfile,
    navigateToSettings,
  };
};

export default useNavigateTo;
