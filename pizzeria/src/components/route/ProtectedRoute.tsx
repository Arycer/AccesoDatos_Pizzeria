import React from 'react';
import { Navigate } from 'react-router-dom';
import {getUserRole} from "../../services/authService.ts";

interface ProtectedRouteProps {
    element: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
    const role = getUserRole();

    if (!role) {
        return <Navigate to="/auth/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/access-denied" />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;