import React from 'react';
import { Pedido } from '../../services/orderService';
import styles from './ClientOrder.module.css';

interface ClientOrderProps {
    order: Pedido;
}

const ClientOrder: React.FC<ClientOrderProps> = ({ order }) => {
    return (
        <tr className={styles.orderRow}>
            <td className={styles.cell}>{order.id}</td>
            <td className={styles.cell}>{new Date(order.fecha).toLocaleString()}</td>
            <td className={styles.cell}>${order.total.toFixed(2)}</td>
            <td className={styles.cell}>{order.estado}</td>
            <td className={styles.cell}>
                {order.pizzas.map((pizza, index) => (
                    <div key={index} className={styles.pizzaItem}>
                        {pizza.nombre} (${pizza.precio.toFixed(2)})
                    </div>
                ))}
            </td>
        </tr>
    );
};

export default ClientOrder;
