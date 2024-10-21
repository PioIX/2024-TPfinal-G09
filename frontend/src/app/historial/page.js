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
  
  async function cargarPartidas() {
    getCardsByUser(idUser)
    getMazoByUser(idUser)
    getGamesByUser(idUser)
    //Que cargue todas las partidas del jugador y que muestre su fecha y su ganador
  };
  
  
  useEffect(() => {
    cargarPartidas()
    //CARGAR Y MOSTRAR partidas;
  }, []);

  function linkBack() {
    //VUELVE AL MENU
  }

//QUE MUESTRE TODAS LOS COMPONENTES PARTIDAS
  return (
    <main>
      <div className={styles.division}>
        
      </div>
    </main>
  );
}
