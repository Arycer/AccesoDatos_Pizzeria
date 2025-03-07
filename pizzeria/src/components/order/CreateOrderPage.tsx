import React, {useEffect, useState} from 'react';
import PizzaItem from '../../components/pizza/PizzaItem';
import Cart, {CartItem} from './Cart';
import {getAvailablePizzas, Pizza} from '../../services/pizzaService';
import {createOrder} from '../../services/orderService';
import styles from './CreateOrderPage.module.css';

const CreateOrderPage: React.FC = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const data = await getAvailablePizzas();
                setPizzas(data);
            } catch (error) {
                console.error('Error al cargar las pizzas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPizzas();
    }, []);

    const handleAddToCart = (pizza: Pizza) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.pizza.id === pizza.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.pizza.id === pizza.id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            return [...prevCart, {pizza, quantity: 1}];
        });
    };

    const handleRemoveFromCart = (pizza: Pizza) => {
        setCart((prevCart) =>
            prevCart.reduce<CartItem[]>((acc, item) => {
                if (item.pizza.id === pizza.id) {
                    if (item.quantity > 1) {
                        acc.push({pizza: item.pizza, quantity: item.quantity - 1});
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleSubmitOrder = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        const pizzasPedidos = cart.flatMap(item =>
            Array.from({length: item.quantity}, () => ({
                nombre: item.pizza.nombre,
                precio: item.pizza.precio,
            }))
        );

        const total = pizzasPedidos.reduce((sum, pizza) => sum + pizza.precio, 0);

        // Construir el objeto pedido.
        const order = {
            clienteUsername: "", // Vacío porque se maneja en el serverside con la sesión
            pizzas: pizzasPedidos,
            total,
            fecha: new Date(),
            estado: "pendiente",
        };

        try {
            const newOrder = await createOrder(order);
            console.log("Pedido creado:", newOrder);
            alert("Pedido enviado correctamente.");
            setCart([]);
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
            alert("Error al enviar el pedido. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Crear Pedido</h1>
            <h2 className={styles.sectionTitle}>Pizzas Disponibles</h2>
            <div className={styles.contentWrapper}>
                <div className={styles.pizzasSection}>
                    {loading ? (
                        <p>Cargando pizzas...</p>
                    ) : (
                        pizzas.map((pizza) => (
                            <PizzaItem
                                key={pizza.id}
                                pizza={pizza}
                                editable={false}
                                onEdit={() => {
                                }}
                                onDelete={() => {
                                }}
                                onToggleAvailability={() => {
                                }}
                                onAddToCart={() => handleAddToCart(pizza)}
                            />
                        ))
                    )}
                </div>
                <div className={styles.cartSection}>
                    <Cart
                        cart={cart}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onClearCart={handleClearCart}
                        onSubmitOrder={handleSubmitOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateOrderPage;
