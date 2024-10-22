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
  async function goTienda(){
    window.location.href = `/tienda?idUser=${userId}`
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
          <Button onClick={goTienda}>Tienda</Button>        

<h2>REGLAS DEL JUEGO</h2>

          <h3>
            En este juego competiras con tus 5 cartas contra las 5 cartas del jugador de la otra maquina
          </h3>
          <ol style={{marginLeft : "100px"}}>
              <li>Leer todas las consignas</li>
              <li>Elegir las 5 cartas para jugar dentro de la pestaña mazo</li>
              <li>Ir a la pestaña Jugar y esperar a que empiece el juego</li>
          </ol>
          <h3> Una vez en el juego, podrás ver tus cartas junto con un mensaje que indicará si eres tú quien debe elegir la característica o no.</h3>
          <ol>
            <li> elegir la caracterista con la que deseas empezar la primera ronda // esperar a que tu rival eliga</li>
            <li> elegir una carta para jugar esa ronda</li>
          </ol>

        </div>
      </main>
    </div>
  );
}

