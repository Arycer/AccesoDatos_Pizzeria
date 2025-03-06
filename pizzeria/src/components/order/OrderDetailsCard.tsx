// src/components/OrderDetailsCard.tsx
import React from 'react';
import { Pedido } from '../../services/orderService';
import styles from './OrderDetailsCard.module.css';

interface OrderDetailsCardProps {
    order: Pedido;
    onClose: () => void;
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({ order, onClose }) => {
    return (
        <div className={styles.cardOverlay}>
            <div className={styles.card}>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                <h2>Detalles del Pedido</h2>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Cliente:</strong> {order.clienteUsername}</p>
                <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Estado:</strong> {order.estado}</p>
                <div>
                    <h3>Pizzas:</h3>
                    <ul>
                        {order.pizzas.map((pizza, index) => (
                            <li key={index}>
                                {pizza.nombre} - ${pizza.precio.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsCard;
