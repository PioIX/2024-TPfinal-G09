import React from 'react';

export default function GameInfo({ partida }) {
  const {
    created_at,
    id,
    idJuego,
    idUser,
    image,
    mail,
    money,
    name,
    password,
    points,
    surname,
    username,
    winner
  } = partida;

  // Formatear la fecha para una mejor visualización
  const formattedDate = new Date(created_at).toLocaleString();

  // Determinar si el usuario es el ganador
  const isWinner = idUser === winner;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
      <h2>Información de la Partida</h2>
      <img src={image} alt={`${username}'s avatar`} style={{ width: '100%', borderRadius: '8px' }} />
      
      <div style={{ marginTop: '10px' }}>
        <p><strong>Nombre:</strong> {name} {surname}</p>
        <p><strong>Usuario:</strong> {username}</p>
        <p><strong>Email:</strong> {mail}</p>
        <p><strong>Dinero:</strong> ${money}</p>
        <p><strong>Puntos:</strong> {points}</p>
        <p><strong>Juego ID:</strong> {idJuego}</p>
        <p><strong>Fecha de creación:</strong> {formattedDate}</p>
        
        {isWinner ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>¡Ganador!</p>
        ) : (
          <p style={{ color: 'red' }}>Perdedor</p>
        )}
      </div>
    </div>
  );
}
