import React, { useState, useEffect } from 'react';
import { Pizza } from '../../services/pizzaService';
import styles from './PizzaDialog.module.css';

interface PizzaDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (pizza: Pizza) => void;
    initialPizza?: Pizza;
}

const PizzaDialog: React.FC<PizzaDialogProps> = ({
                                                     open,
                                                     onClose,
                                                     onSave,
                                                     initialPizza,
                                                 }) => {
    const [nombre, setNombre] = useState(initialPizza?.nombre || '');
    const [descripcion, setDescripcion] = useState(initialPizza?.descripcion || '');
    const [ingredientes, setIngredientes] = useState(
        initialPizza?.ingredientes.join(', ') || ''
    );
    const [precio, setPrecio] = useState(initialPizza?.precio.toString() || '');
    const [imagenUrl, setImagenUrl] = useState(initialPizza?.imagenUrl || '');

    useEffect(() => {
        if (initialPizza) {
            setNombre(initialPizza.nombre);
            setDescripcion(initialPizza.descripcion);
            setIngredientes(initialPizza.ingredientes.join(', '));
            setPrecio(initialPizza.precio.toString());
            setImagenUrl(initialPizza.imagenUrl);
        } else {
            setNombre('');
            setDescripcion('');
            setIngredientes('');
            setPrecio('');
            setImagenUrl('');
        }
    }, [initialPizza, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ingredientesArray = ingredientes
            .split(',')
            .map((i) => i.trim())
            .filter((i) => i);
        const pizza: Pizza = {
            id: initialPizza?.id,
            nombre,
            descripcion,
            ingredientes: ingredientesArray,
            precio: parseFloat(precio),
            imagenUrl,
            // La disponibilidad se maneja desde el componente PizzaItem
            disponible: initialPizza ? initialPizza.disponible : false,
        };
        onSave(pizza);
    };

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialogContent}>
                <h2>{initialPizza ? 'Editar Pizza' : 'Agregar Nueva Pizza'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Descripción:</label>
                        <textarea
                            className={styles.textarea}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ingredientes (separados por comas):</label>
                        <input
                            type="text"
                            value={ingredientes}
                            onChange={(e) => setIngredientes(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Precio:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>URL de Imagen:</label>
                        <input
                            type="text"
                            value={imagenUrl}
                            onChange={(e) => setImagenUrl(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className="primary-btn">
                            {initialPizza ? 'Actualizar' : 'Agregar'}
                        </button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PizzaDialog;
