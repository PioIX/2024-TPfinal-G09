"use client"
import React, { useState, useEffect } from "react";
import Sobre from "@/components/sobres";
import styles from "@/app/tienda/page.module.css";
import { useSearchParams } from 'next/navigation';

export default function Home() {

  const [sobres, setSobres] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get('idUser');

  useEffect(() => {
    async function fetchSobres() {
      const res = await fetch('http://localhost:3001/getSobres');
      const data = await res.json();
      setSobres(data);
    }
    fetchSobres();
  }, []);

  async function goUsers(){
    window.location.href = `/user?idUser=${userId}`
  }
  async function goPlay(){
    window.location.href = `/game?idUser=${userId}`
  }
  async function goRecord(){
    window.location.href = `/historial?idUser=${userId}`
  }
  async function goMazo(){
    window.location.href = `/mazo?idUser=${userId}`
  }
  async function goTienda(){
    window.location.href = `/tienda?idUser=${userId}`
  }

  return (
    <div className={styles.container}>
    <div className={styles.header}>TIENDA DE CARTAS</div>
    
    <div className={styles.sobresContainer}>
      {sobres.map((sobre, index) => (
        <Sobre
          key={sobre.id}
          imagenSrc={`/images/${sobre.name.toLowerCase()}.png`}
          texto={sobre.name}
          subtitulo={`Precio: ${sobre.price} monedas`}
          rareza={sobre.name} // Utiliza `name` para definir la rareza
        />
      ))}
    </div>
  </div>
);
}

