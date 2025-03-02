import React, { useState } from 'react';
import { checkUsernameAvailability, registerUser } from '../../services/authService';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('CLIENTE');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        if (!username || !email || !password) {
            setErrorMsg('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            await checkUsernameAvailability(username);

            setLoading(true);

            await registerUser(username, email, password, role);

            alert('Registro exitoso. Ahora inicia sesión.');
            window.location.href = '/auth/login';
        } catch (error: any) {
            setErrorMsg(error.message || 'Hubo un problema con la conexión. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <h1 className="title">PIZZERÍA POM</h1>
            <div className="register-container">
                <h2 className="register-title">Registrarse</h2>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu nombre de usuario"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@email.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="role">Rol</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="CLIENTE">Cliente</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="register-footer">
                    ¿Ya tienes cuenta? <a href="/auth/login" className="register-link">Inicia sesión</a>
                </p>

                {errorMsg && <div id="errorMsg" className="error-message" aria-live="polite">{errorMsg}</div>}
            </div>
        </div>
    );
};

export default RegisterForm;