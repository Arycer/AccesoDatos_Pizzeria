import React, {useState} from 'react';
import {loginUser, setAuthToken} from '../../services/authService';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        if (!username || !password) {
            setErrorMsg('Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);

        try {
            const data = await loginUser(username, password);

            if (data.token) {
                setAuthToken(data.token);
                window.location.href = data.redirectUrl || "/";
            }
        } catch (error) {
            setErrorMsg('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['login-wrapper']}>
            <h1 className={styles.title}>PIZZERÍA DELICIOSA</h1>
            <div className={styles['login-container']}>
                <h2 className={styles['login-title']}>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <div className={styles['input-group']}>
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            minLength={3}
                            maxLength={20}
                            aria-label="Nombre de usuario"
                        />
                    </div>

                    <div className={styles['input-group']}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                            minLength={5}
                            maxLength={20}
                            aria-label="Contraseña"
                        />
                    </div>

                    <button type="submit" className={`${styles['login-button']} ${styles.btn}`} disabled={loading}>
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </button>
                </form>

                {errorMsg && (
                    <div id="errorMsg" className={styles['error-message']} aria-live="polite">
                        {errorMsg}
                    </div>
                )}

                <p className={styles['login-footer']}>
                    ¿No tienes cuenta? <a href="/auth/register" className={styles['register-link']}>Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;