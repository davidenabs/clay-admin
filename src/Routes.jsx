import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Guest from "./pages/Auth/Layouts/Guest";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import AppLayout from "./pages/Dashboard/Layouts/App";
import Home from "./pages/Dashboard/Home";
import UsersManagement from "./pages/Dashboard/UsersManagement/Index";
import Settings from "./pages/Dashboard/Settings/Index";
import StaffTransactionHistory from "./pages/Dashboard/LoanManagement/ShowAllStaffHistory";
import Receipt from "./pages/Dashboard/LoanManagement/Receipt";
import LoanManagement from "./pages/Dashboard/LoanManagement/Index";
import StaffProfile from "./pages/Dashboard/UsersManagement/StaffProfile";
import SettingsProfile from "./pages/Dashboard/Settings/Profile";
import SettingsProfilePreview from "./pages/Dashboard/Settings/ProfilePreview";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import StaffDetailsAndTransactions from "./pages/Dashboard/LoanManagement/StaffDetailsAndTransactions";

const MyRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/login" replace />} />
    <Route element={<Guest />}>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>
    <Route element={<AuthOutlet fallbackPath='/login' />}>
      <Route element={<AppLayout />}>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/user-management" element={<UsersManagement />} />
        <Route path="/user-management/:userId" element={<StaffProfile />} />
        {/* <Route path="/staff-management/staff-profile/:staffId" element={<StaffProfile />} /> */}
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/loan-management/staff-transaction-history" element={<StaffTransactionHistory />} />
        <Route path="/loan-management/user/:id" element={<StaffDetailsAndTransactions />} />
        <Route path="/loan-management/:transactionId" element={<Receipt />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<SettingsProfile />} />
        <Route path="/settings/profile-preview" element={<SettingsProfilePreview />} />
      </Route>
    </Route>
  </Routes>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default AppRoutes;
