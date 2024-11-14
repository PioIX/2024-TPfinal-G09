"use client";
import React from "react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer} role="status" aria-label="Cargando...">
      <div className={styles.loadingContent}>
        <div className={styles.spinner}>
          <div className={styles.inner}></div>
        </div>
      </div>
    </div>
  );
}
