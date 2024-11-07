"use client"
import { useEffect } from "react";
import React, { useState } from "react";
import { getCardModels, getCardsByUser, getUserById, getMazoByUser } from "@/functions/fetch.js";
import { setCards } from "@/functions/javascript";
import styles from "@/app/user/page.module.css"; 
import { useSearchParams } from 'next/navigation';
import Cartas from "@/components/cartas";
import Header from "@/components/header";
import Loading from "@/components/loading";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsUser, setCardsUser] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  let cont=0

  async function cargarCartas() {
    console.log("cargarCartas")
    const user =await getUserById(idUser)
    const cardsU= await getCardsByUser(idUser)
    const cardsM = await getCardModels()
    console.log(user, cardsU, cardsM)
    const cardsD = await setCards(cardsM, cardsU, user)
    setCardsUser(cardsD)
    setUser(user)
    setIsLoading(false)
    //Que cargue todas las cartas que correspondan al usuario
  };

  async function linkUpdate() {
    //CUANDO GUARDAS, PUTEEA TODAS LAS CARTAS EDITADAS
  };//te devuelve al menu
  
  
  useEffect(() => {
    if(cont<1){
    cargarCartas()
    }
    cont++
    //CARGAR Y MOSTRAR CARTAS;
  }, []);

  function linkBack() {
    //VUELVE AL MENU
  }

//QUE MUESTRE TODAS LAS CARTAS QUE POSEE EL JUEGADOR, TENIENDO DESTACADAS LAS ELEGIDAS POR EL USUARIO
//QUE SE PUEDA ACTUALIZAR LAS CARTAS ELEGIDAS Y QUE PUTEE LAS CARTAS AHORA EDITADAS(TODAS LAS QUE APARECEN EN PANTALLA)
  return (
    <main>
      {isLoading ? ( <Loading/>) : (<></>)} 
      <Header username={user.username} profileImage={user.image} idUser={user.id} />
      <Cartas cards={cardsUser} ></Cartas>
    </main>
  );
}
