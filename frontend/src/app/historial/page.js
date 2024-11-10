"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "@/app/user/page.module.css";
import { getJuegoXUsers,getJuegoXUserById, getUserById, getJuegoById, getJuegos, getUsers } from "@/functions/fetch";
import { findXByID, setGame } from "@/functions/javascript";
import Loading from "@/components/loading";
import Header from "@/components/header";
import Historial from "@/components/historial";

export default function UserGames() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  let cont=0

  async function loadUserGames() {
    try {
      // Cargar listas necesarias y almacenarlas en el estado
      const juegoXusers = await getJuegoXUsers();
      const juegos = await getJuegos();
      const users = await getUsers();
      const user = await getUserById(idUser)
      setUser(user)

      const games = [];
      for (let x = 0; x < juegoXusers.length; x++) {
        const JXU = juegoXusers[x];
        if(JXU.idUser==idUser){  
          let match = await cargarMatch(JXU.id,juegoXusers,juegos,users)
          games.push(match); // Agrega cada match al array 
        }
      }
      setGames(games); // Actualiza el estado con los juegos obtenidos
      setIsLoading(false)
      console.log("Games:", games);
  
      return games;
    } catch (error) {
      console.error("Error al cargar los juegos del usuario:", error);
      return [];
    }
  }

  async function cargarMatch(idJuegoXUser, juegoXusers, juegos, users) {
    const juegoXUser= juegoXusers[findXByID(idJuegoXUser,juegoXusers)]
    const juego = juegos[findXByID(juegoXUser.idJuego, juegos)]
    const user = users[findXByID(juegoXUser.idUser, users)]
    const winner = users[findXByID(juego.winner, users)]
    
    const match = setGame(juego, winner, user, juegoXUser)
    return match
  }; 

  function linkEndGame(idJuegoXUser){
    window.location.href = `/endGame?idJuegoXUser=${idJuegoXUser}`
  }
  
  useEffect(() => {
    if (cont<1) {
      setIsLoading(true)
      loadUserGames();
      cont++
    }
  }, [idUser]);

  return (
    <main>
      {isLoading ? (
        <Loading/>
      ) : (<></>)}
      <Header username={user.username} profileImage={user.image} idUser={user.id} /> 
      <Historial partidas={games} idUser={idUser} linkEndGame={linkEndGame}/> 
    </main>
  );
}
