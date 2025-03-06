export interface PizzaPedido {
    nombre: string;
    precio: number;
}

export interface Pedido {
    id?: string;
    clienteUsername: string;
    pizzas: PizzaPedido[];
    total: number;
    fecha: Date;
    estado: string;
}

/**
 * Crea un nuevo pedido.
 * Requiere autenticación con rol CLIENTE.
 * @param pedido Objeto Pedido a crear.
 * @returns El pedido creado.
 */
export const createOrder = async (pedido: Pedido): Promise<Pedido> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(pedido),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al crear el pedido.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en createOrder:", error);
        throw error;
    }
};

/**
 * Obtiene todos los pedidos.
 * Accesible solo para usuarios con rol ADMIN.
 * @returns Lista de pedidos.
 */
export const getAllOrders = async (): Promise<Pedido[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/pedidos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al obtener los pedidos.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAllOrders:", error);
        throw error;
    }
};

/**
 * Obtiene los pedidos realizados por el cliente autenticado.
 * @returns Lista de pedidos del cliente.
 */
export const getMyOrders = async (): Promise<Pedido[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/pedidos/misPedidos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al obtener los pedidos del cliente.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getMyOrders:", error);
        throw error;
    }
};

/**
 * Obtiene un pedido por su identificador.
 * Accesible para usuarios con rol CLIENTE o ADMIN.
 * @param id Identificador del pedido.
 * @returns El pedido encontrado.
 */
export const getOrderById = async (id: string): Promise<Pedido> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/pedidos/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Pedido no encontrado.");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en getOrderById con id ${id}:`, error);
        throw error;
    }
};

/**
 * Actualiza el estado de un pedido.
 * Accesible solo para usuarios con rol ADMIN.
 * @param id Identificador del pedido a actualizar.
 * @param estado Nuevo estado del pedido.
 * @returns El pedido actualizado.
 */
export const updateOrderStatus = async (id: string, estado: string): Promise<Pedido> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/pedidos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ estado }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al actualizar el estado del pedido.");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en updateOrderStatus con id ${id}:`, error);
        throw error;
    }
};

/**
 * Elimina un pedido por su identificador.
 * Accesible solo para usuarios con rol ADMIN.
 * @param id Identificador del pedido a eliminar.
 */
export const deleteOrder = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/pedidos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al eliminar el pedido.");
        }
    } catch (error) {
        console.error(`Error en deleteOrder con id ${id}:`, error);
        throw error;
    }
};
