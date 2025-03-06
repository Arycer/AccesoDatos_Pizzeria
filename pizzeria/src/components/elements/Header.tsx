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
                <h1
                    className={styles.clickableTitle}
                    onClick={() => navigate('/home')}
                >
                    Pizzeria Deliciosa
                </h1>
            </div>
            <div className={styles.right}>
                {token ? (
                    <>
                        <span className={styles.userInfo}>
                            {username} ({role})
                        </span>
                        <div className={styles.navButtons}>
                            {role === "ADMIN" && (
                                <>
                                    <button
                                        onClick={() => navigate('/admin/orders')}
                                        className={styles.navButton}
                                    >
                                        Gestionar Pedidos
                                    </button>
                                    <button
                                        onClick={() => navigate('/admin/pizzas')}
                                        className={styles.navButton}
                                    >
                                        Gestionar Pizzas
                                    </button>
                                </>
                            )}
                            {role === "CLIENTE" && (
                                <>
                                    <button
                                        onClick={() => navigate('/create-order')}
                                        className={styles.navButton}
                                    >
                                        Crear Pedido
                                    </button>
                                    <button
                                        onClick={() => navigate('/my-orders')}
                                        className={styles.navButton}
                                    >
                                        Mis Pedidos
                                    </button>
                                </>
                            )}
                        </div>
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
