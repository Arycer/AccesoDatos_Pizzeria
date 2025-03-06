// src/pages/AdminHomepage.tsx
import React, { useEffect, useState } from 'react';
import { Pedido, getAllOrders } from '../../services/orderService';
import styles from './AdminHomepage.module.css';

const AdminHomepage: React.FC = () => {
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (err) {
                console.error("Error al obtener pedidos:", err);
                setError("Error al obtener pedidos");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Calcular fecha hace 7 días desde hoy
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    // Filtrar pedidos realizados en la última semana
    const ordersLastWeek = orders.filter(
        (order) => new Date(order.fecha) >= oneWeekAgo
    );
    const countLastWeek = ordersLastWeek.length;
    const totalRevenue = ordersLastWeek.reduce(
        (sum, order) => sum + order.total,
        0
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bienvenido, Administrador</h1>
            {loading ? (
                <p>Cargando datos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.metrics}>
                    <div className={styles.metricItem}>
                        <h2>Pedidos de la última semana</h2>
                        <p className={styles.metricValue}>{countLastWeek}</p>
                    </div>
                    <div className={styles.metricItem}>
                        <h2>Ingresos</h2>
                        <p className={styles.metricValue}>${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHomepage;
