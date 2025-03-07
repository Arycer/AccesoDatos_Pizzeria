import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "../../services/authService.ts";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/auth/login");
    }, [navigate]);

    return <p>Cerrando sesión...</p>;
};

export default Logout;