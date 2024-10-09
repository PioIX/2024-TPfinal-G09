"use client";

import React from "react";
import ChatBar from "@/components/chatBar";  // Importamos el componente ChatBar
import styles from "@/components/navChats.module.css";  // Estilos CSS para NavChats

export default function NavChats({ chat, setSelect, select }) {
  return (
    <div className={styles.navChatsContainer}>
      {chat.map((chat, index) => (
        <ChatBar
          key={index}  // Usamos el índice como clave para evitar advertencias de React
          onClick={() => setSelect(chat.id)} // Actualizar el estado 'select' con el id del chat
          user={chat.user}
          message={chat.message}
          imageUrl={chat.imageUrl}
          chatName={chat.nombre}
          notificationCount= {1}
          group={chat.isGroup}
          idChat={chat.id}
          select={select}
        />
      ))}
    </div>
  );
}