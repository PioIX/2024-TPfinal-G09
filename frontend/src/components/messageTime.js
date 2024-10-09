"use client";

import React from "react";
import styles from "@/components/messageTime.module.css";  // Archivo CSS para personalizar el estilo

export default function MessageTime({ timestamp }) {
  // Convertimos el timestamp a un objeto de fecha
  const date = new Date(timestamp);

  // Formateamos el día y la hora
  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",   // Lunes, Martes, etc.
    day: "numeric",    // Día en formato numérico
    month: "long",     // Mes en formato largo (enero, febrero, etc.)
  });

  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.messageTime}>
      <span>{formattedDate}  {formattedTime}</span> {/* Mostramos la hora */}
    </div>
  );
}