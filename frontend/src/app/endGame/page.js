"use client"
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';
import { getJuegoXUserById, getUserById, getJuegoById } from "@/functions/fetch";
import { setGame } from "@/functions/javascript";
import GameInfo from "@/components/gameInfo";

export default function Home() {
  
  const searchParams = useSearchParams();
  const idJuegoXUser = searchParams.get('idJuegoXUser');
  const [match, setMatch] = useState({})
  let cont=0
  async function goMenu(){
    window.location.href = `/menu?idUser=${userId}`
  }
  
  async function cargarMatch() {
    console.log("cargarMatch")
    const juegoXUser= await getJuegoXUserById(idJuegoXUser)
    const juego = await getJuegoById(juegoXUser.idJuego)
    const user = await getUserById(juegoXUser.idUser)
    const match = setGame(juego, user, juegoXUser)
    console.log("Match: ", match)
    
    setMatch(match)
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
        <h2>Bienvenido a PioCards</h2>   
        <GameInfo partida={match} />   
      </main>
  );
}

