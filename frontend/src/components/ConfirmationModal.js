import React from 'react';
import Button from './button';
import styles from './confirmationModal.module.css';

const ConfirmationModal = ({ sobre, onConfirm, onCancel }) => {
  if (!sobre) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Confirmar compra</h2>
        <p>¿Quieres comprar el sobre de categoria < strong>{sobre.name}</> por {sobre.price} monedas?</p>
        <div className={styles.modalActions}>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
