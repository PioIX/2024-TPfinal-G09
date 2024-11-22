"use client";
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import styles from "@/app/menu/page.module.css";
import { getUserById } from "@/functions/fetch";
import { useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Loading from "@/components/loading";

export default function Home() {
  const [user, setUser] = useState({});
  const searchParams = useSearchParams();
  const idUser = searchParams.get("idUser");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarUser() {
      const user = await getUserById(idUser);
      setUser(user);
      setIsLoading(false);
    }
    cargarUser();
  }, [idUser]);

  const navigation = [
    { label: "Jugar", onClick: () => (window.location.href = `/game?idUser=${idUser}`) },
    { label: "Mazo", onClick: () => (window.location.href = `/mazo?idUser=${idUser}`) },
    { label: "Historial", onClick: () => (window.location.href = `/historial?idUser=${idUser}`) },
    { label: "Perfil", onClick: () => (window.location.href = `/user?idUser=${idUser}`) },
    { label: "Tienda", onClick: () => (window.location.href = `/tienda?idUser=${idUser}`) },
  ];

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <Header username={user.username} money={user.money} profileImage={user.image} idUser={user.id} />
          <div className={styles.container}>
            <div className={styles.welcome}>
              <h1>Bienvenido a <span className={styles.brand}>PioCards</span></h1>
              <div className={styles.navigation}>
                {navigation.map((navItem, index) => (
                  <Button key={index} onClick={navItem.onClick}>
                    {navItem.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.rules}>
              <h2>Reglas del Juego</h2>
              <p>Compite con tus 5 cartas contra las del jugador contrario. ¡Gana escogiendo la mejor estrategia!</p>
              <ol>
                <li>Lee todas las consignas.</li>
                <li>Elige tus 5 cartas desde la pestaña "Mazo".</li>
                <li>Presiona "Jugar" y espera a que comience el juego.</li>
              </ol>
              <h3>Durante el juego:</h3>
              <ul>
                <li>Selecciona una característica para empezar.</li>
                <li>Escoge una carta para jugar cada ronda.</li>
                <li>Gana el que tiene la mejor puntuación.</li>
              </ul>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}


