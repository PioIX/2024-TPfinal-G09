"use client"
import React from "react";
import styles from "./loading.module.css"; // Importa los estilos CSS

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        {/* Puedes poner aquí tu logo */}
        <div className={styles.spinner}></div>
        <p className="p">Cargando...</p>
      </div>
    </div>
  );
}
