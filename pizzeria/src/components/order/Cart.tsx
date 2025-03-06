import React from 'react';
import { Pizza } from '../../services/pizzaService';
import styles from './Cart.module.css';

export interface CartItem {
    pizza: Pizza;
    quantity: number;
}

interface CartProps {
    cart: CartItem[];
    onAddToCart: (pizza: Pizza) => void;
    onRemoveFromCart: (pizza: Pizza) => void;
    onClearCart: () => void;
    onSubmitOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onAddToCart, onRemoveFromCart, onClearCart, onSubmitOrder }) => {
    const total = cart.reduce((acc, item) => acc + item.pizza.precio * item.quantity, 0);

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.title}>Carrito</h2>
            {cart.length === 0 ? (
                <p>No hay pizzas en el carrito.</p>
            ) : (
                <>
                    <ul className={styles.cartList}>
                        {cart.map((item) => (
                            <li key={item.pizza.id} className={styles.cartItem}>
                                <span className={styles.itemName}>
                                    {item.pizza.nombre} x {item.quantity}
                                    <span className={styles.itemPrice}>
                                        (${(item.pizza.precio * item.quantity).toFixed(2)})
                                    </span>
                                </span>
                                <div className={styles.itemButtons}>
                                    <button className={styles.button} onClick={() => onAddToCart(item.pizza)}>
                                        +
                                    </button>
                                    <button className={styles.button} onClick={() => onRemoveFromCart(item.pizza)}>
                                        -
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.total}>Total: ${total.toFixed(2)}</div>
                    <div className={styles.actionsRow}>
                        <button className={styles.clearButton} onClick={onClearCart}>
                            Vaciar Carrito
                        </button>
                        <button className={styles.submitButton} onClick={onSubmitOrder}>
                            Enviar Pedido
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
