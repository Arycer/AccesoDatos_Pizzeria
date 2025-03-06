import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { logout, getUserData } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            getUserData(token)
                .then(user => {
                    setUsername(user.username);
                    setRole(user.role);
                })
                .catch(error => {
                    console.error("Error al obtener los datos del usuario:", error);
                });
        }
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1>Pizzeria</h1>
            </div>
            <div className={styles.right}>
                {token ? (
                    <>
            <span className={styles.userInfo}>
              {username} ({role})
            </span>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    </>
                ) : (
                    <span className={styles.userInfo}>Sesión no iniciada</span>
                )}
            </div>
        </header>
    );
};

export default Header;
