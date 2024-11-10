"use client";
import React from "react";
import Carta from "@/components/carta";
import styles from "@/components/carta.module.css";

export default function Cartas({ cards, mostrarUsername = false, seleccionable = false, setSelectCard }) {
  // Maneja la selección de la carta si `seleccionable` es true
  const handleCardClick = (id) => {
    if (seleccionable && setSelectCard) {
      setSelectCard(id);
    }
  };

  return (
    <div className={styles.statsContainer}>
      {cards.map((carta, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(carta.id)}
          className={seleccionable ? styles.cardSelectable : ""}
        >
          {mostrarUsername && <h3>{carta.username}</h3>}
          <Carta
            nombre={carta.nombre}
            materia={carta.materia}
            img={carta.img}
            calidad={carta.calidad}
            carisma={carta.carisma}
            conocimiento={carta.conocimiento}
            experiencia={carta.experiencia}
            paciencia={carta.paciencia}
            popularidad={carta.popularidad}
            autoridad={carta.autoridad}
            winner={carta.winner}
            hand={carta.hand}
          />
        </div>
      ))}
    </div>
  );
}
