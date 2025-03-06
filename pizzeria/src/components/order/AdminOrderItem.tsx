import React from 'react';
import { Pedido } from '../../services/orderService';
import styles from './AdminOrderItem.module.css';

interface OrderItemProps {
    order: Pedido;
    statuses: string[];
    onStatusChange: (orderId: string, newStatus: string) => void;
    onViewDetails: (order: Pedido) => void;
}

const AdminOrderItem: React.FC<OrderItemProps> = ({ order, statuses, onStatusChange, onViewDetails }) => {
    return (
        <tr className={styles.orderRow}>
            <td className={styles.cell}>{order.id}</td>
            <td className={styles.cell}>{order.clienteUsername}</td>
            <td className={styles.cell}>{new Date(order.fecha).toLocaleString()}</td>
            <td className={styles.cell}>${order.total.toFixed(2)}</td>
            <td className={styles.cell}>{order.estado}</td>
            <td className={styles.cell}>
                <div className={styles.actionsContainer}>
                    <select
                        className={styles.statusSelect}
                        value={order.estado}
                        onChange={(e) => onStatusChange(order.id!, e.target.value)}
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <button
                        className={styles.viewDetailsButton}
                        onClick={() => onViewDetails(order)}
                    >
                        Ver Detalles
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default AdminOrderItem;
