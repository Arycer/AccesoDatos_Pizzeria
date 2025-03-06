// src/pages/ClientHomepage.tsx
import React from 'react';
import styles from './ClientHomepage.module.css';

const ClientHomepage: React.FC = () => {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.overlay}>
                    <h1 className={styles.title}>Bienvenidos a Pizzeria Deliciosa</h1>
                    <p className={styles.subtitle}>
                        Disfruta de nuestras pizzas artesanales hechas con ingredientes 100% naturales.
                    </p>
                </div>
            </section>
            <section className={styles.content}>
                <h2>Las Mejores Pizzas de la Ciudad</h2>
                <p>
                    En Pizzeria Deliciosa, cada pizza es una obra de arte culinaria. Utilizamos solo ingredientes naturales,
                    frescos y de la mejor calidad para crear sabores únicos e inolvidables. Nuestra masa es elaborada a mano y horneada en
                    horno de leña, otorgándole ese toque crujiente y delicioso que tanto te gusta.
                </p>
                <p>
                    Desde la clásica Margarita hasta creaciones innovadoras, tenemos una pizza para cada gusto. Nuestras recetas resaltan lo mejor de la
                    naturaleza, ofreciéndote una experiencia gourmet que cuida tu paladar y tu bienestar.
                </p>
                <h2>¿Por qué elegirnos?</h2>
                <ul className={styles.features}>
                    <li>Ingredientes 100% naturales y frescos</li>
                    <li>Masa artesanal elaborada a mano</li>
                    <li>Horneadas en horno de leña</li>
                    <li>Recetas tradicionales e innovadoras</li>
                    <li>Compromiso con la calidad y el sabor</li>
                </ul>
            </section>
        </div>
    );
};

export default ClientHomepage;
