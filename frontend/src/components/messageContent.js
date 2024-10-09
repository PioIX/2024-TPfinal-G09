"use client";

import React from "react";
import styles from "@/components/messageContent.module.css";  // Archivo CSS para personalizar el estilo

export default function MessageContent({ content }) {
  return (
    <div className={styles.messageContent}>
      {content}
    </div>
  );
}