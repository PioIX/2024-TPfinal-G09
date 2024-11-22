import React from 'react';
import styles from './partidaHistorial.module.css'; // Usa CSS Modules para estilos personalizados

function PartidaHistorial({ partida, idUser, linkEndGame }) {
  const isWinner = partida.winner == idUser; // Determina si el usuario es el ganador
  const isDraw = partida.winner == null; // Determina si es un empate

  return (
    <div
      className={`${styles.partida} ${isDraw ? styles.draw : isWinner ? styles.winner : styles.loser}`}
      onClick={() => linkEndGame(partida.id)}
    >
      <div className={styles.infoContainer}>
        {!isDraw && <img src={partida.image} alt={partida.name} className={styles.avatar} />}
        <div className={styles.details}>
          <h3>{isDraw ? "¡Empate!" : partida.name}</h3>
          <h4>ID de Partida: {partida.idJuego}</h4>
          <h4>Puntaje: {partida.points}</h4>
          <h4>Fecha: {new Date(partida.created_at).toLocaleDateString()}</h4>
        </div>
      </div>
    </div>
  );
}

export default PartidaHistorial;
