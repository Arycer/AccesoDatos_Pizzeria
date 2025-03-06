import React, { useEffect, useState } from 'react';
import { Pizza } from '../../services/pizzaService';
import PizzaItem from './PizzaItem';
import PizzaDialog from './PizzaDialog';
import { getAllPizzas, addPizza, updatePizza, deletePizza } from '../../services/pizzaService';
import styles from './PizzaManager.module.css';

const PizzaManager: React.FC = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>(undefined);

    const fetchPizzas = async () => {
        try {
            setLoading(true);
            const data = await getAllPizzas();
            setPizzas(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar las pizzas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    const handleAdd = () => {
        setSelectedPizza(undefined);
        setDialogOpen(true);
    };

    const handleEdit = (pizza: Pizza) => {
        setSelectedPizza(pizza);
        setDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar esta pizza?')) {
            try {
                await deletePizza(id);
                setPizzas(pizzas.filter((p) => p.id !== id));
            } catch (err: any) {
                alert(err.message || 'Error al eliminar la pizza.');
            }
        }
    };

    const handleToggleAvailability = async (pizza: Pizza, newAvailability: boolean) => {
        try {
            const updatedPizza = await updatePizza(pizza.id!, { ...pizza, disponible: newAvailability });
            setPizzas(pizzas.map((p) => (p.id === pizza.id ? updatedPizza : p)));
        } catch (err: any) {
            alert(err.message || 'Error al actualizar la disponibilidad.');
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogSave = async (pizza: Pizza) => {
        try {
            if (pizza.id) {
                // Actualizar pizza existente
                const updated = await updatePizza(pizza.id, pizza);
                setPizzas(pizzas.map((p) => (p.id === pizza.id ? updated : p)));
            } else {
                // Agregar nueva pizza
                const added = await addPizza(pizza);
                setPizzas([...pizzas, added]);
            }
            setDialogOpen(false);
        } catch (err: any) {
            alert(err.message || 'Error al guardar la pizza.');
        }
    };

    if (loading) {
        return <div>Cargando pizzas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.managerContainer}>
            <h1 className={styles.header}>Gestión de Pizzas</h1>
            <button onClick={handleAdd} className="primary-btn">
                Agregar Nueva Pizza
            </button>
            <div className={styles.pizzaList}>
                {pizzas.map((pizza) => (
                    <PizzaItem
                        key={pizza.id}
                        pizza={pizza}
                        editable={true}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleAvailability={handleToggleAvailability}
                    />
                ))}
            </div>
            <PizzaDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSave={handleDialogSave}
                initialPizza={selectedPizza}
            />
        </div>
    );
};

export default PizzaManager;
