"use client";
import React from "react";
import styles from "./loading.module.css"; // Importa los estilos CSS

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        {/* El spinner ahora tiene un inner con la animación */}
        <div className={styles.spinner}>
          <div className={styles.inner}></div>
        </div>
        <p className={styles.p}></p>
      </div>
    </div>
  );
}
