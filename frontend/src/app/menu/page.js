"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';

export default function Home() {
  
  const searchParams = useSearchParams();
  const userId = searchParams.get('idUser');

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

  return (
    <div>
      <main>
        <div className={styles.container}>
        <h2>Bienvenido a PioCards</h2>
          <Button onClick={goPlay}>Jugar</Button>
          <Button onClick={goMazo}>Mazo</Button>
          <Button onClick={goRecord}>Historial</Button>
          <Button onClick={goUsers}>Perfil</Button>        
        </div>
      </main>
    </div>
  );
}

