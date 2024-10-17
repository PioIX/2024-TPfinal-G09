"use client"
import Button from "@/components/button";
import Link from "next/router";
import { useRouter, router } from "next/router";
import React, { useState, useEffect } from "react";
import { getUsers, getCardModels, getCards, getJuegoXUsers, getSobres, getJuegos} from "@/app/javascript.js";
import Input from "@/components/input"; // Importamos el componente Input
import styles from "@/app/page.module.css"; // Estilos para el formulario
import Header from "@/components/header";
import Deportistas from "@/components/deportistas";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [cardModels, setCardModels] = useState([]);
  const [cards, setCards] = useState([]);
  const [jXU, setJXU] = useState([]);
  const [sobres, setSobres] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setId] = useState(-1)
  const [info, setInfo] =useState([])

  async function goUsers(){
    window.location.href = `/user?idUser=${userId}`
  }
  async function cargarDatos() {
    try {
      const users = await getUsers();
      const CardModels = await getCardModels();
      const Cards = await getCards();
      const JXU = await getJuegoXUsers();
      const Sobres = await getSobres();
      const Juegos= await getJuegos();
      setUsers(users);
      setCardModels(CardModels);
      setCards(Cards);
      setJXU(JXU);
      setSobres(Sobres);
      setJuegos(Juegos);
    } catch (error) {
      console.error("Error cargando los deportistas:", error);
    } 
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  useEffect(() => {
    console.log(cardModels);
  }, [cardModels]);
  useEffect(() => {
    console.log(cards);
  }, [cards]);
  useEffect(() => {
    console.log(jXU);
  }, [jXU]);
  useEffect(() => {
    console.log(sobres);
  }, [sobres]);
  useEffect(() => {
    console.log(juegos);
  }, [juegos]);

  return (
    <div>
     <Header/>
      <main>
        <div className={styles.container}>
        <h2>deportistas</h2>
      
          <Deportistas deportistas={users}
         />
        </div>
          <Input
            label="id User"
            type="number"
            name="number"
            value={userId}
            onChange={(e) => setId(e.target.value)}
          />
          <Button onClick={goUsers}>user</Button>

          <h2>Información requerida</h2>
      </main>
    </div>
  );
}

