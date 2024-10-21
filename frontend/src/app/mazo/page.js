"use client"
import { useEffect } from "react";
import React, { useState } from "react";
import { getCardsByUser, getGamesByUser, getMazoByUser } from "@/functions/fetch.js";
import styles from "@/app/user/page.module.css"; 
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [userCards, setUsers] = useState([]);
  
  async function cargarCartas() {
    getCardsByUser(idUser)
    getMazoByUser(idUser)
    getGamesByUser(idUser)
    //Que cargue todas las cartas que correspondan al usuario
    //hacer del back que traiga solo esas
  };

  async function linkUpdate() {
    //CUANDO GUARDAS, PUTEEA TODAS LAS CARTAS EDITADAS
  };//te devuelve al menu
  
  
  useEffect(() => {
    cargarCartas()
    //CARGAR Y MOSTRAR CARTAS;
  }, []);

  function linkBack() {
    //VUELVE AL MENU
  }

//QUE MUESTRE TODAS LAS CARTAS QUE POSEE EL JUEGADOR, TENIENDO DESTACADAS LAS ELEGIDAS POR EL USUARIO
//QUE SE PUEDA ACTUALIZAR LAS CARTAS ELEGIDAS Y QUE PUTEE LAS CARTAS AHORA EDITADAS(TODAS LAS QUE APARECEN EN PANTALLA)
  return (
    <main>
      <div className={styles.division}>
        
      </div>
    </main>
  );
}
