"use client"
import React, { useState, useEffect } from "react";
import { getCardModels, getCardsByUser, getGamesByUser, getMazoByUser } from "@/functions/fetch.js";
import {setCards } from "@/functions/javascript"
import { useSearchParams } from "next/navigation";
import Cartas from "@/components/cartas";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsPlay, setCardsPlay] = useState([]);

  async function cargarCartas() {
    const cardsU= await getCardsByUser(idUser)
    const cardsM = await getCardModels()
    const cardsD = await setCards(cardsM, cardsU)
    console.log(cardsD)
    setCardsPlay(cardsD)
    
    //Que cargue todas las cartas que correspondan al usuario
  };

  useEffect(() => {
    cargarCartas();
  }, []);
  //crear primero Componentes->cartas->carta + puntaje + Username
  //crear pantalla de elección de propiedad
  //crear pantalla de elección de carta
  //crear pantalla donde muestre las cartas jugadas por vos y por los demás y luego el ganador de ronda
  
  //hacer que según la fase del juego vaya mostrando los distintos componentes->1.propiedad/espera ->2.carta+espera ->3.ganador
  return (
    <div>
      <main>
        <Cartas cards={cardsPlay}></Cartas>
      </main>
    </div>
  );
}

