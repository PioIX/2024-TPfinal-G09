"use client"
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';
import { getJuegoXUserById, getUserById, getJuegoById } from "@/functions/fetch";
import { setGame } from "@/functions/javascript";
import GameInfo from "@/components/gameInfo";
import Loading from "@/components/loading";
import Header from "@/components/header";
export default function Home() {
  
  const searchParams = useSearchParams();
  const idJuegoXUser = searchParams.get('idJuegoXUser');
  const [match, setMatch] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  let cont=0
  
  async function cargarMatch() {
    console.log("cargarMatch")
    const juegoXUser= await getJuegoXUserById(idJuegoXUser)
    const juego = await getJuegoById(juegoXUser.idJuego)
    const user = await getUserById(juegoXUser.idUser)
    const winner = await getUserById(juego.winner)
    const match = setGame(juego, winner, user, juegoXUser)
    console.log("Match: ", match)
    
    setUser(user)
    setMatch(match)
    setIsLoading(false)
    //Que cargue todas las cartas que correspondan al usuario
  }; 

  useEffect(() => {
    if (cont<1){
      console.log(idJuegoXUser)
      cargarMatch();
      cont++
    }
  }, []);

  return (
      <main>
        <Header username={user.username} money={user.money} profileImage={user.image} idUser={user.id} /> 
        {isLoading ? (
        <Loading/>
      ) : (
        <GameInfo partida={match} />
      )}  
      </main>
  );
}

