"use client";
import Link from "next/link";
import React from "react";
import LastMessage from "@/components/lastMessage.js";  // Último mensaje
import NameChat from "@/components/nameChat.js";  // Nombre del chat
import Notification from "@/components/notification.js"; // Notificación
import styles from "@/components/chatBar.module.css"; // Estilos CSS

export default function Header({}) {
  return (
    <header>
    <Link href="/">
      <h1>Deportistas y usuarios</h1>
    </Link>
    </header>
  );
}