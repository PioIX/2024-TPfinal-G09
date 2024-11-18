"use client"
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/menu/page.module.css"; // Estilos para el formulario
import { getUserById } from "@/functions/fetch";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";
import Loading from "@/components/loading";

export default function Home() {
  const [user, setUser] = useState({})
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  let cont=0

  async function cargarUser() {
    console.log("cargarUser")
    const user = await getUserById(idUser)
    setUser(user)
    setIsLoading(false)
    //Que cargue todas las cartas que correspondan al usuario
  }; 

  useEffect(() => {
    if (cont<1){
      cargarUser();
      cont++
    }
  }, []);

  async function goUsers(){
    window.location.href = `/user?idUser=${idUser}`
  }
  async function goPlay(){
    window.location.href = `/game?idUser=${idUser}`
  }
  async function goRecord(){
    window.location.href = `/historial?idUser=${idUser}`
  }
  async function goMazo(){
    window.location.href = `/mazo?idUser=${idUser}`
  }
  async function goTienda(){
    window.location.href = `/tienda?idUser=${idUser}`
  }

  return (
    <div>
              {isLoading ? ( <Loading/>) : (      <main>
        <Header username={user.username} profileImage={user.image} idUser={user.id} />

        <div className={styles.container}>    
          <Button onClick={goPlay}>Jugar</Button>
          <Button onClick={goMazo}>Mazo</Button>
          <Button onClick={goRecord}>Historial</Button>
          <Button onClick={goUsers}>Perfil</Button>        
          <Button onClick={goTienda}>Tienda</Button>        
        </div>
        <div className= {styles.reglas}>
            {/* <h2>REGLAS DEL JUEGO</h2>
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
              </ol> */}
          </div>
      </main>)} 
    </div>
  );
}

