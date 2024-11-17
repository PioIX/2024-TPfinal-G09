"use client";
import React from "react";
import styles from "@/components/carta.module.css";

export default function Carta({
  nombre,
  materia,
  img,
  calidad,
  carisma,
  conocimiento,
  experiencia,
  paciencia,
  popularidad,
  autoridad,
  hand,
  sobre,
  winner = false
}) {
  return (
    <div
      className={`${styles.carta} ${styles[calidad.toLowerCase()]} ${
        winner ? styles.winner : ""
      } ${hand || sobre ? "" : styles.noElegido}`}  // Modificada la condición
    >
      <div className={styles.cartaHeader}>
        <div className={styles.calidad}>
          <img src="/calidad.png" alt="icon" className={styles.iconL} />
          {calidad}
        </div>
        <div className={styles.materia}>
          {materia}
          <img src="/libro.png" alt="icon" className={styles.iconR} />
        </div>
      </div>
      <img src={img} alt={nombre} className={styles.cartaImg} />
      <h2 className={styles.nombre}>{nombre}</h2>
      <div className={styles.statsContainer}>
        <div className={styles.column}>
          <p>
            <strong>Car.</strong> {carisma}
          </p>
          <p>
            <strong>Con.</strong> {conocimiento}
          </p>
          <p>
            <strong>Exp.</strong> {experiencia}
          </p>
        </div>
        <div className={styles.column}>
          <p>
            <strong>Pac.</strong> {paciencia}
          </p>
          <p>
            <strong>Pop.</strong> {popularidad}
          </p>
          <p>
            <strong>Aut.</strong> {autoridad}
          </p>
        </div>
      </div>
    </div>
  );
}
