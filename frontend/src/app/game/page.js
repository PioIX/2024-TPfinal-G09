"use client"
import React, { useState, useEffect } from "react";
import { getCardModels, getUserById, getMazoByUser, getUsers, insertJuegoXUser } from "@/functions/fetch.js";
import {findXByID, setCards } from "@/functions/javascript"
import { useSearchParams } from "next/navigation";
import GameStage from "@/components/gameStage";
import { useSocket } from "@/hooks/useSocket";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsUser, setCardsUser] = useState([])
  const [username, setUsername] = useState("")
  const [cardsPlay, setCardsPlay] = useState([]); 
  const [propSelect, setPropSelect] = useState("");
  const [cardSelect, setCardSelect] = useState(-1);
  const [fase, setFase]= useState(-1)
  const [status, setStatus] = useState(-1);
  const [puntos, setPuntos] = useState([]);
  const [idJuego, setIdJuego] = useState(-1)
  const { isConnected, gameData, socket, joinRoom, chooseProp, chooseCard, endRound } = useSocket();
  const [loop, setLoop] = useState([])//el loop es un vector que tiene los usuarios de la partida
  //y que uno de estos usuarios 
  const [idSala, setIdSala] = useState("")
  let cont=0

  async function cargarCartas() {
    console.log("cargarCartas")
    const users =await getUserById(idUser)
    setUsername(users[0].username)
    const cardsU= await getMazoByUser(idUser)
    const cardsM = await getCardModels()
    const cardsD = await setCards(cardsM, cardsU, users)
    console.log(cardsD)
    setCardsUser(cardsD)
    //Que cargue todas las cartas que correspondan al usuario
  };
/* Unirse a la sala al cargar la página
  useEffect(() => {
    if(!socket)return;
      joinRoom(idUser, idSala  );

  }, [isConnected, idUser]);
*/
// Efecto para cambiar el estado al recibir el loop
  useEffect(() => {
    console.log("cambio game data")
    if (fase==0){
      if (loop.length > 0) {
      const currentUserTurn = loop[0] == idUser;
      setStatus(currentUserTurn ? 0 : 1);
      setCardSelect(-1)
      setPropSelect("")
      console.log("Loop:",loop)
    }}
    if (fase==1){
      setStatus(2)
      console.log("prop:", propSelect)
    }
    if (fase==2){
      setStatus(4)
      let newCardsU = cardsUser
      newCardsU.splice(findXByID(cardSelect,newCardsU),1);
      setCardsUser(newCardsU)
      console.log("Cards User nuevas",cardsUser)
    }
    if (fase==3){
      console.log("id juego:", idJuego)
      let newJXU = {idUser:idUser, idJuego:idJuego}
      console.log("nuevo vinculo JXU")
      insertJuegoXUser(newJXU)
      window.location.href = `/endGame?idJuegoXUser=${idJuego}`
    }
    
  }, [fase]);
  
  useEffect(() => {
    setPuntos(gameData.puntos)
    setLoop(gameData.loop)
    setCardsPlay(gameData.cardsPlay)
    setPropSelect(gameData.propSeleccionada)
    setFase(gameData.fase)
    setIdJuego(gameData.idJuego)
  }, [gameData]);

  const handleConexion = async () => {
    if (!socket) return;
    joinRoom(idUser, username, idSala); // Se ejecuta solo después de que cargarCartas termine
  };

  // Handler para enviar la propiedad seleccionada
  const handleSendProp = () => {
    if(propSelect!=""){
      console.log("enviando propiedad:", propSelect)
      chooseProp(propSelect, idSala);
      setStatus(0); // Pasar a seleccionar carta
    }else{
      window.alert("Selecciona una carta!!")
    }
  };

  // Handler para enviar la carta seleccionada
  const handleSendCard = () => {
    if(cardSelect!=-1){
      console.log("enviando carta:", cardSelect)
      chooseCard(cardsUser[findXByID(cardSelect,cardsUser)], idSala);
      setStatus(3); // Esperar a que todos envíen sus cartas
    }else{
      window.alert("Selecciona una carta!!")
    }
  };

  // Handler para continuar a la siguiente ronda
  const handleNextRound = () => {
    console.log("pido nueva ronda")
    endRound(puntos, loop, idSala);
  };

  useEffect(() => {
    if (cont<1){
      cargarCartas();
      cont++
    }
  }, []);
  return (
    <div>
      <main>
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
          handleConexion={handleConexion}
          handleSendProp={handleSendProp}
          handleSendCard={handleSendCard}
          nextRound={handleNextRound}
          idSala={idSala}
          setIdSala={setIdSala}
          />
      </main>
    </div>
  );
}
