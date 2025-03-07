import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AccessDenied.module.css';

const AccessDenied: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Acceso Denegado</h1>
            <p className={styles.message}>No tienes permisos para acceder a esta página.</p>
            <button className={styles["back-button"]} onClick={() => navigate("/")}>
                Volver al inicio
            </button>
        </div>
    );
};

export default AccessDenied;