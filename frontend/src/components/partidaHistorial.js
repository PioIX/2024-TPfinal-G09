import React from 'react';
import styles from './PartidaHistorial.module.css'; // Usa CSS Modules para estilos personalizados

function PartidaHistorial({ partida, idUser, linkEndGame }) {
  const isWinner = partida.winner == idUser; // Determina si el usuario es el ganador

  return (
    <div className={`${styles.partida} ${isWinner ? styles.winner : styles.loser}`} onClick={() => linkEndGame(partida.id)}>
      <div className={styles.infoContainer}>
        <img src={partida.image} alt={partida.name} className={styles.avatar} />
        <div className={styles.details}>
          <h3>{partida.name}</h3>
          <h4>ID de Partida: {partida.idJuego}</h4>
          <h4>Puntaje: {partida.points}</h4>
          <h4>Fecha: {new Date(partida.created_at).toLocaleDateString()}</h4>
        </div>
      </div>
    </div>
  );
}

export default PartidaHistorial;
