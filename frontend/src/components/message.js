"use client"
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MessageContent from "@/components/messageContent";  
import MessageTime from "@/components/messageTime"; 
import MessageUser from "@/components/messageUser";
import styles from "@/components/message.module.css";

export default function Message({ timestamp, content, group, userName, own }) {
  return (
    <div className={
      own
        ? styles.ownMessage // Mensajes propios a la derecha
        : styles.otherMessage // Mensajes de otros a la izquierda
    }>
      <MessageUser group={group} userName={userName} own={own}/> {/* Mostrar nombre si es un grupo */}
      <MessageContent content={content} />               {/* Mostrar el contenido del mensaje */}
      <MessageTime timestamp={timestamp} />              {/* Mostrar la hora del mensaje */}
    </div>
  );
}