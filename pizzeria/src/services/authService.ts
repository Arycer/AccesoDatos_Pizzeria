export interface LoginResponse {
    token: string;
    redirectUrl?: string;
}

export interface User {
    username: string;
    role: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch("http://localhost:8080/auth/generateToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        if (!response.ok) throw new Error("Error en la autenticación");
        return await response.json();
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
};

export const checkUsernameAvailability = async (username: string): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/auth/checkUsername?username=${username}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "El nombre de usuario ya está en uso.");
        }
    } catch (error) {
        throw new Error("Error al verificar disponibilidad del nombre de usuario.");
    }
};

export const registerUser = async (username: string, email: string, password: string, role: string): Promise<void> => {
    const userData = { username, email, password, roles: role };

    try {
        const response = await fetch("http://localhost:8080/auth/addNewUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al registrar el usuario.');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Hubo un problema con la conexión. Inténtalo más tarde.');
        } else {
            throw new Error('Hubo un problema con la conexión. Inténtalo más tarde.');
        }
    }
};

export const setAuthToken = (token: string): void => {
    localStorage.setItem("token", token);
    document.cookie = `jwtToken=${token}; Path=/; SameSite=Strict`;
};

export const getUserData = async (token: string): Promise<User> => {
    try {
        const response = await fetch('http://localhost:8080/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario.');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Hubo un problema al obtener los datos.');
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};