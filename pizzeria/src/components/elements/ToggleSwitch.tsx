import React from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
    checked: boolean;
    onToggle: (newValue: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({checked, onToggle}) => {
    return (
        <div
            className={`${styles.toggleSwitch} ${checked ? styles.active : ''}`}
            onClick={() => onToggle(!checked)}
        ></div>
    );
};

export default ToggleSwitch;
