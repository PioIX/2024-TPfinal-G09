"use client"
import React, { useState, useEffect } from "react";
import { getCardModels, getHandByUser, getGamesByUser, getMazoByUser, getUsers } from "@/functions/fetch.js";
import {setCards } from "@/functions/javascript"
import { useSearchParams } from "next/navigation";
import Cartas from "@/components/cartas";
import GameStage from "@/components/gameStage";
import { useSocket } from "@/hooks/useSocket";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsUser, setCardsUser] = useState([])
  const [cardsPlay, setCardsPlay] = useState([]); 
  const [propSelect, setPropSelect] = useState("");
  const [cardSelect, setCardSelect] = useState(-1);
  const [status, setStatus] = useState(-1);
  const [puntos, setPuntos] = useState([
    { idUser: "user1", username: "user1", puntaje: 2 },
    { idUser: "user2", username: "user2", puntaje: 156 },
    { idUser: "user3", username: "user3", puntaje: 0 },
  ]);
  const { isConnected, gameData, socket, joinRoom, chooseProp, chooseCard, endRound } = useSocket();
  const [loop, setLoop] = useState([])//el loop es un vector que tiene los usuarios de la partida
  //y que uno de estos usuarios 

  async function cargarCartas() {
    const users =await getUsers()
    const cardsU= await getMazoByUser(idUser)
    const cardsM = await getCardModels()
    const cardsD = await setCards(cardsM, cardsU, users)
    console.log(cardsD)
    setCardsUser(cardsD)
    
    //Que cargue todas las cartas que correspondan al usuario
  };
// Unirse a la sala al cargar la página
  useEffect(() => {
    if(!socket)return;
      joinRoom(idUser, "sala1");

  }, [isConnected, idUser]);

// Efecto para cambiar el estado al recibir el loop
  useEffect(() => {
    console.log(loop)
    if (loop.length > 0) {
      const currentUserTurn = loop[0] == idUser;
      setStatus(currentUserTurn ? 0 : 1);
    }
  }, [loop]);

  useEffect(() => {
    setPuntos(gameData.puntos)
    setLoop(gameData.loop)
    setCardsPlay(gameData.cardsPlay)
    setPropSelect(gameData.propSeleccionada)
  }, [gameData]);


  // Handler para enviar la propiedad seleccionada
  const handleSendProp = () => {
    chooseProp(propSelect);
    setStatus(2); // Pasar a seleccionar carta
  };

  // Handler para enviar la carta seleccionada
  const handleSendCard = () => {
    chooseCard(selectedCard);
    setStatus(3); // Esperar a que todos envíen sus cartas
  };

  // Handler para continuar a la siguiente ronda
  const handleNextRound = () => {
    endRound(puntos, loop);
    setStatus(0); // Volver al estado de selección de propiedad
  };

  useEffect(() => {
    cargarCartas();
  }, []);
  return (
    <div>
      <main>
        <div>
        <button onClick={() => setStatus(-1)}>Conexión</button>
        <button onClick={() => setStatus(0)}>Elige Propiedad</button>
        <button onClick={() => setStatus(1)}>Esperando Propiedad</button>
        <button onClick={() => setStatus(2)}>Elige Carta</button>
        <button onClick={() => setStatus(3)}>Esperando Cartas</button>
        <button onClick={() => setStatus(4)}>Mostrar Cartas</button>
        <button onClick={() => setStatus(5)}>Mostrar Ganador</button>
        </div>
        <GameStage 
          status={status} 
          cardsUser={cardsUser}
          cardsPlay={cardsPlay}
          setStatus={setStatus}
          setSelectProp={setPropSelect}
          setSelectCard={setCardSelect}
          selectedProp={propSelect}
          selectedCard={cardSelect}
          puntos={puntos}
          setPuntos={setPuntos}
          handleSendProp={handleSendProp}
          handleSendCard={handleSendCard}
          nextRound={handleNextRound}/>
      </main>
    </div>
  );
}


/*<div>
        <button onClick={() => setStatus(-1)}>Conexión</button>
        <button onClick={() => setStatus(0)}>Elige Propiedad</button>
        <button onClick={() => setStatus(1)}>Esperando Propiedad</button>
        <button onClick={() => setStatus(2)}>Elige Carta</button>
        <button onClick={() => setStatus(3)}>Esperando Cartas</button>
        <button onClick={() => setStatus(4)}>Mostrar Cartas</button>
        <button onClick={() => setStatus(5)}>Mostrar Ganador</button>
        </div>*/