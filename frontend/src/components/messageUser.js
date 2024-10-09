/* messageContent.module.css */
"use client";

import React from "react";
import styles from "@/components/messageUser.module.css"; // Archivo CSS para el estilo

export default function MessageUser({group, userName, own}) {
  if (!group || own) {
    return null; // Si no es un grupo, no mostramos nada
  }

  return (
    <div className={styles.userMessage}>
      {userName}
    </div>
  );
}