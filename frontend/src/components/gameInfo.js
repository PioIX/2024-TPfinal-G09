import React from 'react';
import styles from './gameInfo.module.css';
import ActualProfilePic from './actualProfilePic';

export default function GameInfo({ partida }) {
  const {
    created_at,
    idJuego,
    idUser,
    image,
    mail,
    name,
    points,
    surname,
    username,
    winner,
    nombre
  } = partida;

  // Formatear la fecha para una mejor visualización
  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.header}>Información de la partida</h2>

        {winner === null ? (
          <p className={styles.draw}>¡Lamentablemente es un empate, {nombre}!</p>
        ) : idUser === winner ? (
          <p className={styles.winner}>¡Ganaste {nombre}!</p>
        ) : (
          <p className={styles.loser}>Perdiste {nombre}...</p>
        )}
        <br/>
        <div className={styles.info}>
          <p><span className={styles.label}>Juego ID:</span> {idJuego}</p>
          <p><span className={styles.label}>Fecha de juego:</span> {formattedDate}</p>
        </div>

        {winner !== null && (
          <>
            <br/>
            <h2 className={styles.header}>Información de ganador</h2>
            <ActualProfilePic imageUrl={image} className={styles.profilePic} />
            <div className={styles.info}>
              <p><span className={styles.label}>Nombre:</span> {name} {surname}</p>
              <p><span className={styles.label}>Usuario:</span> {username}</p>
              <p><span className={styles.label}>Email:</span> {mail}</p>
              <p><span className={styles.label}>Puntos:</span> {points}</p>
            </div>
          </>
        )}

        {winner == null && (
          <>
            <br/>
            <div className={styles.info}>
              <p><span className={styles.label}>Puntaje máximo:</span> {points}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
