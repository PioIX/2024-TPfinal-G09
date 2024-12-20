"use client"
import React, { useState, useEffect } from "react";
import { getCardModels, getUserById, getMazoByUser, insertJuegoXUser, fetchUpdateUserMoney } from "@/functions/fetch.js";
import {findXByID, setCards } from "@/functions/javascript"
import { useSearchParams } from "next/navigation";
import GameStage from "@/components/gameStage";
import { useSocket } from "@/hooks/useSocket";
import Header from "@/components/header";
import Loading from "@/components/loading"
import Button from "@/components/button";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsUser, setCardsUser] = useState([])
  const [user, setUser] = useState({})
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
  let prueba=0
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [winner, setWinner]= useState(-1)

  async function cargarCartas() {
    console.log("cargarCartas")
    const user =await getUserById(idUser)
    const cardsU= await getMazoByUser(idUser)
    const cardsM = await getCardModels()
    const cardsD = await setCards(cardsM, cardsU, user)
    console.log(cardsD)
    setCardsUser(cardsD)
    setUser(user)
    setIsLoading(false)
    //Que cargue todas las cartas que correspondan al usuario
  };

  useEffect(() => {
    if (cont<1){
      cargarCartas();
      cont++
    }
  }, []);

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

      endGame(newJXU)
    }
    
  }, [fase]);
  
  useEffect(() => {
    setPuntos(gameData.puntos)
    setLoop(gameData.loop)
    setCardsPlay(gameData.cardsPlay)
    setPropSelect(gameData.propSeleccionada)
    setFase(gameData.fase)
    setIdJuego(gameData.idJuego)
    setWinner(gameData.winner)
  }, [gameData]);

  async function handleConexion() {
    if (!socket) return;
    joinRoom(idUser, user.username, idSala); // Se ejecuta solo después de que cargarCartas termine
  };

  // Handler para enviar la propiedad seleccionada
  function handleSendProp() {
    if(propSelect!=""){
      console.log("enviando propiedad:", propSelect)
      chooseProp(propSelect, idSala);
      setStatus(0); // Pasar a seleccionar carta
    }else{
      window.alert("Selecciona una carta!!")
    }
  };

  // Handler para enviar la carta seleccionada
  function handleSendCard(){
    if(cardSelect!=-1){
      console.log("enviando carta:", cardSelect)
      chooseCard(cardsUser[findXByID(cardSelect,cardsUser)], idSala);
      setStatus(3); // Esperar a que todos envíen sus cartas
    }else{
      window.alert("Selecciona una carta!!")
    }
  };

  // Handler para continuar a la siguiente ronda
  function handleNextRound() {
    console.log("pido nueva ronda")
    endRound(puntos, loop, idSala);
  };

  async function endGame(newJXU){
    console.log("nuevo vinculo JXU", newJXU)
    let idJXU =await insertJuegoXUser(newJXU)
    let nuevoDinero = -1
    if(parseInt(winner)==idUser){
      nuevoDinero = user.money + 1000;
    }else{
      nuevoDinero = user.money + 400
    }
    const usuarioActualizado = { ...user, money: nuevoDinero };
    await fetchUpdateUserMoney(usuarioActualizado);
    window.location.href = `/endGame?idJuegoXUser=${idJXU}`
  }
  /*
  function cProp() {
      chooseProp("conocimiento", idSala);
  };

  function cCard() {
      chooseCard(cardsUser[prueba], idSala);
      prueba++
  };

  function eRound() {
      endRound(puntos, loop, idSala);
  };
*/
  return (
    <div>
      <main>
        <Header username={user.username} money={user.money} profileImage={user.image} idUser={user.id} />
        {/*<Button onClick={cProp}>prop</Button> 
        <Button onClick={cCard}>card</Button>
        <Button onClick={eRound}>end round</Button>*/}
        {isLoading ? (<Loading/>
        ) : (
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
          />)} 
      </main>
    </div>
  );
}