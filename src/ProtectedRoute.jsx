import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthStatus from './hooks/useAuthStatus';
import { useAuthUser } from 'react-auth-kit';
import useNavigateTo from './hooks/useNavigateTo';
import useAuthenticatedUser from './hooks/useAuthenticatedUser';
import { showErrorToast } from './utils/toast';

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStatus();

    // const { navigateToVerifyEmail, navigateToLogin } = useNavigateTo();
console.log(isAuthenticated);

    if (!isAuthenticated) {
        showErrorToast('You are not authorized to access this route')
        return <Navigate to="/login" replace />;
    }
    const { user, profile } = useAuthenticatedUser();

    // if (user && !user.emailVerifiedAt) {
    //     showErrorToast("You've not verify your email");
    //     return <Navigate to="/verify-email" replace />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;
