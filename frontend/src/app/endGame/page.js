"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';
import { getJuegoXUserById, getUserById } from "@/functions/fetch";

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
    const match = setGame(juego, user)
    console.log(match)
    
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
      </main>
  );
}

