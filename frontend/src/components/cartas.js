"use client";

import React from "react";
import Carta from "@/components/carta"

export default function Cartas({cards}) {
  return (
    <div>
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