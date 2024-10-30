"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/tienda/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';
import Sobre from "@/components/sobres";
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
  async function goTienda(){
    window.location.href = `/tienda?idUser=${userId}`
  }

  return (
    <div>
      
<div className={styles.header}>
  TIENDA DE CARTAS
</div>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Sobre 
                imagenSrc="/calidad.png" 
                texto="¡Colección de Figuritas!" 
                subtitulo="Tipo de Sobre: Estándar" 
            />
        </div>

    </div>
  );
}

