import React, { useEffect, useState } from 'react';
import { Pedido, getAllOrders, updateOrderStatus } from '../../services/orderService';
import AdminOrderItem from './AdminOrderItem.tsx';
import OrderDetailsCard from './OrderDetailsCard';
import styles from './AdminOrdersPage.module.css';

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const updatedOrder = await updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders =>
                prevOrders.map(order => order.id === orderId ? updatedOrder : order)
            );
            alert("Estado actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            alert("Error al actualizar el estado del pedido");
        }
    };

    const handleViewDetails = (order: Pedido) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    // Posibles estados del pedido
    const statuses = ["pendiente", "confirmado", "en preparación", "enviado", "cancelado"];

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Gestor de Pedidos</h1>
            {loading ? (
                <p>Cargando pedidos...</p>
            ) : (
                <>
                    <table className={styles.ordersTable}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <AdminOrderItem
                                key={order.id}
                                order={order}
                                statuses={statuses}
                                onStatusChange={handleStatusChange}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                        </tbody>
                    </table>
                    {selectedOrder && (
                        <OrderDetailsCard order={selectedOrder} onClose={handleCloseDetails} />
                    )}
                </>
            )}
        </div>
    );
};

export default AdminOrdersPage;
