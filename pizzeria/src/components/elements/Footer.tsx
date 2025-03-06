// src/components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Pizzeria Deliciosa. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
