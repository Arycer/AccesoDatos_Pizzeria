import {jwtDecode} from "jwt-decode";

export const baseURL = "http://localhost:8080";

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
        const response = await fetch(baseURL + "/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include",
        });

        console.log(response);

        if (!response.ok) throw new Error("Error en la autenticación");
        return await response.json();
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
};

export const checkUsernameAvailability = async (username: string): Promise<void> => {
    try {
        const response = await fetch(baseURL + `/auth/checkUsername?username=${username}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "El nombre de usuario ya está en uso.");
        }
    } catch (error) {
        throw new Error("Error al verificar disponibilidad del nombre de usuario.");
    }
};

export const registerUser = async (username: string, email: string, password: string, role: string): Promise<void> => {
    const userData = {username, email, password, roles: role};

    try {
        const response = await fetch(baseURL +  "/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
        const response = await fetch(baseURL + '/auth/me', {
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
    document.cookie = "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
};

export const getUserRole = (): string | null => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const decoded: any = jwtDecode(token);
        if (decoded && decoded.rol) {
            return decoded.rol;
        } else {
            console.warn("El token no contiene el campo 'role'.");
            return null;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};