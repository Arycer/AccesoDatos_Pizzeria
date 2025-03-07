// src/components/RoleBasedComponent.tsx
import React from 'react';
import {getUserRole} from '../../services/authService.ts';
import AccessDenied from "./AccessDenied.tsx";

interface RoleBasedComponentProps {
    roleComponents: { [role: string]: React.ReactNode };
}

const RoleBasedRoute: React.FC<RoleBasedComponentProps> = ({roleComponents}) => {
    const role = getUserRole();

    if (!role || !roleComponents[role]) {
        return <>{AccessDenied}</>;
    }

    return <>{roleComponents[role]}</>;
};

export default RoleBasedRoute;
