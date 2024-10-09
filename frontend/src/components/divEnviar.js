"use client";

import React, { useRef } from "react";
import styles from "@/components/divEnviar.module.css"; // Estilos para la sección de envío
import Button from "./button";
import Input from "./input";

export default function DivEnviar({ setMensaje, mensaje, onClick }) {

  return (
    <div className={styles.divEnviar}>
      <Input
        label={""}
        type={"text"}
        name={"mensaje"}
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}  // Añadimos el manejo de input
        className={styles.inputMensaje} // Aplica estilos específicos al input
        placeholder="Escribe un mensaje..." // Placeholder para una mejor experiencia de usuario
      />
      <Button onClick={onClick} className={styles.botonEnviar}>
        Enviar
      </Button>
    </div>
  );
}
