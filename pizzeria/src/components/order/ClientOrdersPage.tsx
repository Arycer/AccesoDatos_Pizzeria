// src/pages/MisPedidosPage.tsx
import React, {useEffect, useState} from 'react';
import {getMyOrders, Pedido} from '../../services/orderService';
import ClientOrder from './ClientOrder';
import styles from './ClientOrdersPage.module.css';

const ClientOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error al obtener mis pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Mis Pedidos</h1>
            {loading ? (
                <p>Cargando mis pedidos...</p>
            ) : orders.length === 0 ? (
                <p>No has realizado ningún pedido.</p>
            ) : (
                <table className={styles.ordersTable}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Pizzas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <ClientOrder key={order.id} order={order}/>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientOrdersPage;
