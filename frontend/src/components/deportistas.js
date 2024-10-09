"use client";

import React from "react";
import Deportista from "@/components/deportista"
import styles from "@/components/deportistas.module.css";

export default function Deportistas({deportistas}) {
  return (
    <div className={styles.chatContainer}>
      {deportistas.map((deportista, index) => (
        <div
          key={index}
        >
          <Deportista className={styles.deportista}
            nombre={deportista.nombre}
            apellido={deportista.apellido}
            username={deportista.username}
            image={deportista.image}
          />
        </div>
      ))}
    </div>
  );
}