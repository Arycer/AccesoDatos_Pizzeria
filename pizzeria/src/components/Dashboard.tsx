import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, logout } from '../services/authService';

interface User {
    username: string;
    role: string;
}

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("No estás autenticado.");
                }

                const userData = await getUserData(token);
                setUser(userData);
            } catch (error: any) {
                setError(error.message || 'Hubo un problema al obtener los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, {user?.username}!</h1>
            <p>Rol: {user?.role}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Dashboard;