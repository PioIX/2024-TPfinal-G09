"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import { getUsers, getCardModels, getCards, getJuegoXUsers, getSobres, getJuegos} from "@/functions/fetch.js";
import Input from "@/components/input"; // Importamos el componente Input
import styles from "@/app/page.module.css"; // Estilos para el formulario

export default function Home() {
  //crear primero Componentes->cartas->carta + puntaje + Username
  //crear pantalla de elección de propiedad
  //crear pantalla de elección de carta
  //crear pantalla donde muestre las cartas jugadas por vos y por los demás y luego el ganador de ronda
  
  //hacer que según la fase del juego vaya mostrando los distintos componentes->1.propiedad/espera ->2.carta+espera ->3.ganador
  return (
    <div>
      <main>
        
      </main>
    </div>
  );
}

