"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css"; // Estilos para el formulario
import { useSearchParams } from 'next/navigation';

export default function Home() {
  
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const idJuego = searchParams.get('idJuego');
  async function goMenu(){
    window.location.href = `/menu?idUser=${userId}`
  }
  
  useEffect(() => {
    console.log(idUser,idJuego)
  }, []);

  return (
      <main>
        <h2>Bienvenido a PioCards</h2>      
      </main>
  );
}

