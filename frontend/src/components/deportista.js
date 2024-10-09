"use client";

import React from "react";
import Message from "@/components/message"; // Importa el componente que renderiza el mensaje
import styles from "@/components/chat.module.css"; // Estilos para el componente Chat
import ProfilePic from "./profilePic";

export default function Deportista({nombre, apellido, username, image}) {
  return (
    <div className={styles.chatContainer}>
      <h3>{username}</h3>      
      <p>{nombre}, {apellido}</p>
      <ProfilePic imageUrl={image} />
    </div>
  );
}