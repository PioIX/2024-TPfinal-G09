import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (options = { withCredentials: true }, serverUrl = "ws://localhost:4000/") => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState({
    loop: [],
    puntos: [],
    propSeleccionada: null,
    cardsPlay: [],
    endGameData: null,
  });

  useEffect(() => {
    const socketIo = io(serverUrl, options);
    
    socketIo.on('connect', () => {
      setIsConnected(true);
      console.log('Socket conectado.');
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket desconectado');
    });

    // Listeners para eventos del servidor
    socketIo.on('readyRound', ({ loop, puntos }) => {
      setGameData(prev => ({ ...prev, loop, puntos }));
    });

    socketIo.on('sendProp', (prop) => {
      setGameData(prev => ({ ...prev, propSeleccionada: prop }));
    });

    socketIo.on('sendCardsYPoints', ({ cardsPlay, puntos }) => {
      setGameData(prev => ({ ...prev, cardsPlay, puntos }));
    });

    socketIo.on('endGame', ({ idUser, puntos }) => {
      setGameData(prev => ({ ...prev, endGameData: { idUser, puntos } }));
    });

    // Guardar el socket en el estado
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl, JSON.stringify(options)]);

  // Funciones para emitir eventos al servidor
  const joinRoom = (idUser, idSala) => {
    console.log('Enviando joinRoom con idUser:', idUser, 'y idSala:', idSala);
    if (socket) socket.emit('joinRoom', { idUser, idSala });
  };

  const chooseProp = (prop) => {
    if (socket) socket.emit('chooseProp', prop);
  };

  const chooseCard = (card) => {
    if (socket) socket.emit('chooseCard', card);
  };

  const endRound = (points, loop) => {
    if (socket) socket.emit('endRound', { points, loop });
  };

  return { socket, isConnected, gameData, joinRoom, chooseProp, chooseCard, endRound };
};

export { useSocket };
