// PizzaItem.tsx
import React from 'react';
import { Pizza } from '../../services/pizzaService';
import ToggleSwitch from '../elements/ToggleSwitch';
import styles from './PizzaItem.module.css';

interface PizzaItemProps {
    pizza: Pizza;
    editable: boolean;
    onEdit: (pizza: Pizza) => void;
    onDelete: (id: string) => void;
    onToggleAvailability: (pizza: Pizza, newAvailability: boolean) => void;
    onAddToCart?: (pizza: Pizza) => void; // propiedad opcional para añadir al carrito
}

const PizzaItem: React.FC<PizzaItemProps> = ({
                                                 pizza,
                                                 editable,
                                                 onEdit,
                                                 onDelete,
                                                 onToggleAvailability,
                                                 onAddToCart,
                                             }) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div>
                    <div className={styles.title}>{pizza.nombre}</div>
                    <div className={styles.description}>{pizza.descripcion}</div>
                    <div className={styles.ingredientsLabel}>Ingredientes:</div>
                    <div className={styles.ingredientsBox}>
                        <ul className={styles.ingredientsList}>
                            {pizza.ingredientes.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    {editable ? (
                        <>
                            <button
                                className={`${styles.buttonCommon} ${styles.editButton}`}
                                onClick={() => onEdit(pizza)}
                            >
                                Editar
                            </button>
                            <button
                                className={`${styles.buttonCommon} ${styles.deleteButton}`}
                                onClick={() => onDelete(pizza.id!)}
                            >
                                Borrar
                            </button>
                            <div className={styles.availabilityContainer}>
                                <span>Disponible:</span>
                                <ToggleSwitch
                                    checked={pizza.disponible}
                                    onToggle={(newValue) =>
                                        onToggleAvailability(pizza, newValue)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <button
                            className={`${styles.buttonCommon} ${styles.addToCartButton}`}
                            onClick={() => onAddToCart && onAddToCart(pizza)}
                        >
                            Añadir al carrito
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.imageContainer}>
                {pizza.imagenUrl && (
                    <img src={pizza.imagenUrl} alt={pizza.nombre} className={styles.pizzaImage} />
                )}
            </div>
        </div>
    );
};

export default PizzaItem;
