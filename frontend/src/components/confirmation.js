import React from 'react';
import Button from './button';
import styles from './confirmation.module.css';

export default function Confirmation({ sobre, onConfirm, onCancel }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Confirmar compra</h2>
        <p>
          ¿Quieres comprar el sobre de categoría <strong>{sobre.name} </strong> 
           por {sobre.price} monedas?
        </p>
        <div className={styles.modalActions}>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
