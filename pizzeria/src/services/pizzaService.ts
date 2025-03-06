export interface Pizza {
    id?: string;
    nombre: string;
    descripcion: string;
    ingredientes: string[];
    precio: number;
    imagenUrl: string;
    disponible: boolean;
}

/**
 * Obtiene la lista de todas las pizzas.
 */
export const getAllPizzas = async (): Promise<Pizza[]> => {
    try {
        const response = await fetch("http://localhost:8080/api/pizzas", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Error al obtener las pizzas.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAllPizzas:", error);
        throw error;
    }
};

/**
 * Obtiene la lista de pizzas disponibles (requiere autenticación con rol CLIENTE).
 */
export const getAvailablePizzas = async (): Promise<Pizza[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/pizzas/disponibles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error al obtener las pizzas disponibles.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAvailablePizzas:", error);
        throw error;
    }
};

/**
 * Obtiene una pizza por su identificador.
 * @param id Identificador de la pizza.
 */
export const getPizzaById = async (id: string): Promise<Pizza> => {
    try {
        const response = await fetch(`http://localhost:8080/api/pizzas/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Pizza no encontrada.");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en getPizzaById con id ${id}:`, error);
        throw error;
    }
};

/**
 * Agrega una nueva pizza a la base de datos (requiere autenticación con rol ADMIN).
 * @param pizza Objeto pizza con los datos a registrar.
 */
export const addPizza = async (pizza: Pizza): Promise<Pizza> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/pizzas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(pizza),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al agregar la pizza.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en addPizza:", error);
        throw error;
    }
};

/**
 * Actualiza los datos de una pizza existente (requiere autenticación con rol ADMIN).
 * @param id Identificador de la pizza a actualizar.
 * @param pizza Objeto pizza con los nuevos datos.
 */
export const updatePizza = async (id: string, pizza: Pizza): Promise<Pizza> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/pizzas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(pizza),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al actualizar la pizza.");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en updatePizza con id ${id}:`, error);
        throw error;
    }
};

/**
 * Elimina una pizza por su identificador (requiere autenticación con rol ADMIN).
 * @param id Identificador de la pizza a eliminar.
 */
export const deletePizza = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/pizzas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al eliminar la pizza.");
        }
    } catch (error) {
        console.error(`Error en deletePizza con id ${id}:`, error);
        throw error;
    }
};
