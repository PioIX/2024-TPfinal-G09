"use client"
import React, { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket"; // Importar el hook personalizado de Socket.IO
import { useSearchParams } from "next/navigation";
import GameStage from "@/components/gameStage";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const { isConnected, gameData, joinRoom, chooseProp, chooseCard, endRound } = useSocket();

  const [status, setStatus] = useState(-1);
  const [selectedProp, setSelectedProp] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsUser, setCardsUser] = useState([]);

  // Unirse a la sala al cargar la página
  useEffect(() => {
    console.log("a")
    if (isConnected && idUser) {
      console.log("eee")
      joinRoom(idUser, "sala1");
    }
  }, [isConnected, idUser]);

  // Efecto para cambiar el estado al recibir el loop
  useEffect(() => {
    if (gameData.loop.length > 0) {
      const currentUserTurn = gameData.loop[0] == idUser;
      setStatus(currentUserTurn ? 0 : 1);
    }
  }, [gameData.loop]);

  // Handler para enviar la propiedad seleccionada
  const handleSendProp = () => {
    chooseProp(selectedProp);
    setStatus(2); // Pasar a seleccionar carta
  };

  // Handler para enviar la carta seleccionada
  const handleSendCard = () => {
    chooseCard(selectedCard);
    setStatus(3); // Esperar a que todos envíen sus cartas
  };

  // Handler para continuar a la siguiente ronda
  const handleNextRound = () => {
    endRound(gameData.puntos, gameData.loop);
    setStatus(0); // Volver al estado de selección de propiedad
  };

  return (
    <div>
      <main>
        <GameStage
          status={status}
          cardsUser={cardsUser}
          cardsPlay={gameData.cardsPlay}
          setStatus={setStatus}
          setSelectProp={setSelectedProp}
          setSelectCard={setSelectedCard}
          selectedProp={gameData.propSeleccionada}
          selectedCard={selectedCard}
          puntos={gameData.puntos}
          handleSendProp={handleSendProp}
          handleSendCard={handleSendCard}
          nextRound={handleNextRound}
        />
      </main>
    </div>
  );
}
