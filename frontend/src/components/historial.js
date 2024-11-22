import React from 'react';
import PartidaHistorial from '@/components/partidaHistorial';
import styles from './historial.module.css';

function Historial({ partidas, idUser, linkEndGame}) {
  return (
    <div className={styles.historial}>
      <h2>Historial de Partidas</h2>
      <div className={styles.partidasContainer}>
        {partidas.map((partida) => (
          <PartidaHistorial linkEndGame={linkEndGame} key={partida.id} partida={partida} idUser={idUser} />
        ))}
      </div>
    </div>
  );
}

export default Historial;
