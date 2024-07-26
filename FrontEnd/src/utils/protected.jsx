/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext1.jsx';

const ProtectedRoute = ({ roles }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (!roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
