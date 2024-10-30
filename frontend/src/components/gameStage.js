"use client";

  /*Crear un componente que recibe un status y un vector cartas, 
  si el status de partida es -1, se muestra un texto de espera 
  para que se conecten todos los jugadores,
  si el status es 0, entonces mostrar botones de las siguientes 6 props 
  (carisma, popularidad, experiencia, paciencia, conocimiento y autoridad)y un boton enviar
  que use setSelectProp(propSelect)
  si el status es 1, espera a que alguien elija la propiedad,
  si el status es 2, que muestre la propiedad elegida arriba la derecha, un texto que
  pida elegir una carta para compartir en esa propiedad, que cuando se toque una carta, 
  use setSelectCard(idCard)
  si el status es 3, que muestre la carta elegida y la propiedad elegida, y texto esperando...
  si el status es 4, que muestre todas las cartas elegidas, users y la prop
  si el status es 5, que muestre la carta y el user ganador
  */
 import React from 'react';
import Cartas from "@/components/cartas"; // Importamos el componente Cartas
import styles from "@/components/gameStage.module.css"; // CSS para estilos específicos del GameStage
import { findXByID } from '@/functions/javascript';
import Button from './button';

export default function GameStage({
  status,
  cardsUser,
  cardsPlay,
  setStatus,
  setSelectProp,
  setSelectCard,
  selectedProp,
  selectedCard,
  puntos,
  handleSendProp, 
  handleSendCard,
  nextRound
}) {

  // Renderización del puntaje de cada jugador
  const renderPuntos = () => (
    <div className={styles.puntosContainer}>
      {puntos.map((punto) => (
        <p key={punto.idUser}>
          {punto.username}: {punto.puntaje} puntos
        </p>
      ))}
    </div>
  );

  // Renderización según el estado del juego
  switch (status) {
    case -1:
      return (
        <div className={styles.waitingContainer}>
          {renderPuntos()}
          <div className={styles.waitingText}>Esperando a que se conecten todos los jugadores...</div>
        </div>
      );

    case 0:
      return (
        <div className={styles.selectPropContainer}>
          {renderPuntos()}
          <h3>Elige una propiedad para jugar:</h3>
          {['carisma', 'popularidad', 'experiencia', 'paciencia', 'conocimiento', 'autoridad'].map((prop) => (
            <Button key={prop} onClick={() => setSelectProp(prop)}>{prop}</Button>
          ))}
          <Button onClick={() => handleSendProp()}>Enviar</Button>
          <Cartas cards={cardsUser} mostrarUsername={false} /> {/* Cartas del usuario */}
        </div>
      );

    case 1:
      return (
        <div className={styles.waitingContainer}>
          {renderPuntos()}
          <div className={styles.waitingText}>Esperando a que un jugador elija una propiedad...</div>
          <Cartas cards={cardsUser} mostrarUsername={false} /> {/* Cartas del usuario */}
        </div>
      );

    case 2:
      return (
        <div className={styles.selectCardContainer}>
          {renderPuntos()}
          <div className={styles.selectedProp}>Propiedad elegida: {selectedProp}</div>
          <p>Elige una carta para competir en la propiedad "{selectedProp}":</p>
          <Button onClick={() => handleSendCard()}>Enviar</Button>
          <Cartas 
            cards={cardsUser} 
            seleccionable={true} 
            setSelectCard={setSelectCard} // Habilita la selección de carta
          />
        </div>
      );

    case 3:
      const selectedCarta = cardsUser.find((carta) => carta.id === selectedCard);
      return (
        <div className={styles.selectedCardContainer}>
          {renderPuntos()}
          <div className={styles.selectedProp}>Propiedad elegida: {selectedProp}</div>
          <p>Carta seleccionada:</p>
          <Cartas cards={[selectedCarta]}/>
          <p>Esperando a que todos los jugadores seleccionen su carta...</p>
        </div>
      );

    case 4:
      return (
        <div className={styles.allSelectedCards}>
          {renderPuntos()}
          <div className={styles.selectedProp}>Propiedad elegida: {selectedProp}</div>
          <h3>Cartas elegidas:</h3>
          <Cartas cards={cardsPlay} mostrarUsername={true} /> {/* Cartas en juego de la ronda */}
        </div>
      );

    case 5:
        // Verificar si existe una carta ganadora marcada con `winner: true`
        const cartaGanadora = cardsPlay.find((carta) => carta.winner == true)
        // Sumar puntos al usuario ganador
      
        return (
          <div className={styles.winnerContainer}>
            {renderPuntos()}
            <h3>Carta ganadora:</h3>
            <h4>¡El ganador es {cartaGanadora.username}!</h4>
            {/* Usar el componente Cartas para mostrar la carta ganadora */}
            <Cartas cards={[cartaGanadora]}/>
            <Button onClick={() => nextRound()}>Continuar</Button>
          </div>
        );

    default:
      return null;
  }
}
