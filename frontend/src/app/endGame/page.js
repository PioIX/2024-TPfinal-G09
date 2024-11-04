import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EndGamePage.css'; // Asegúrate de tener estilos específicos para la página

const EndGamePage = () => {
  const [gameData, setGameData] = useState(null);
  const [isWinner, setIsWinner] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idJuego = params.get('idJuego');
  const idUser = params.get('idUser');

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`/api/games/${idJuego}`);
        const game = await response.json();

        setGameData(game);
        setIsWinner(game.winner === idUser);
      } catch (error) {
        console.error("Error al obtener los datos del juego:", error);
      }
    };

    fetchGameData();
  }, [idJuego, idUser]);

  if (!gameData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`end-game-page ${isWinner ? 'winner' : 'loser'}`}>
      <h1>{isWinner ? '¡Felicidades, ganaste!' : 'Perdiste esta vez, ¡sigue intentando!'}</h1>
      
      <div className="game-info">
        <p><strong>Fecha y hora de la partida:</strong> {new Date(gameData.date).toLocaleString()}</p>
        <p><strong>Ganador:</strong> {gameData.winnerUser}</p>
        <h2>Otros jugadores:</h2>
        <ul>
          {gameData.players.map(player => (
            <li key={player.id}>{player.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EndGamePage;
