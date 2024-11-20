import React, { useState } from 'react';
import Sobre from '@/components/sobre'; // Componente de sobre reutilizable
import styles from './SecretCode.module.css'; // Estilos opcionales

export default function SecretCode({ onGoldSobreSelect }) {
  const [secretCode, setSecretCode] = useState(''); // Estado para el código ingresado
  const [showGoldSobre, setShowGoldSobre] = useState(false); // Estado inicial: sobre no visible
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error opcional

  // Array de códigos permitidos
  const validCodes = ['gold']; // Códigos válidos

  // Función para verificar el código
  const handleCheckCode = () => {
    if (validCodes.includes(secretCode.toLowerCase())) {
      setShowGoldSobre(true); // Muestra el sobre si el código es válido
      setErrorMessage(''); // Limpia errores previos
    } else {
      setErrorMessage('Código incorrecto. Intenta nuevamente.');
      setShowGoldSobre(false); // Asegura que no se muestre el sobre
    }
  };

  // Manejar evento de "Enter" en el input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckCode();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ingresa tu código secreto:</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={secretCode}
          placeholder="Introduce tu código"
          onChange={(e) => setSecretCode(e.target.value)}
          onKeyPress={handleKeyPress} // Manejar "Enter"
          className={styles.input}
        />
        <button onClick={handleCheckCode} className={styles.button}>
          Verificar Código
        </button>
      </div>

      {/* Mensaje de error */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Muestra el sobre solo si el estado `showGoldSobre` es true */}
      {showGoldSobre && (
        <div className={styles.sobreContainer}>
          <Sobre
            sobre={{
              name: 'Gold',
              price: 0, // Precio ficticio
              id: 999, // ID ficticio
            }}
            setSobreSelect={onGoldSobreSelect} // Llama a la función del componente padre
          />
        </div>
      )}
    </div>
  );
}
