"use client";

import React from "react";
import Carta from "@/components/carta"
import styles from "@/components/carta.module.css"; // Importamos el CSS como módulo

export default function Cartas({cards}) {
  return (
    <div className={styles.statsContainer}>
      {cards.map((carta, index) => (
        <div
          key={index}
        >
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
          />
        </div>
      ))}
    </div>
  );
}