"use client";

import React from "react";

  /*tiene varios estados, si el status de partida es -1, se espera a que se conecten todos,
  si el status es 0, entonces mostrar botones de props y el enviar
  si el status es 1, espera a que alguien elija
  si el status es 2, que deje elegir cartas y muestre la propiedad elegida
  si el status es 3, que muestre la carta elegida y la propiedad elegida
  si el status es 4, que muestre todas las cartas elegidas, users y la prop
  si el status es 5, que muestre la carta y el user ganador
  */
export default function GameHeader({ label, type, name, value, onChange }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );}