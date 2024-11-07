import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (options = { withCredentials: true }, serverUrl = "ws://localhost:3001/") => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState({
    loop: [],
    puntos: [],
    propSeleccionada: null,
    cardsPlay: [],
    endGameData: null,
    idJuego:-1,
    fase:-1
  }); 

  useEffect(() => {
    const socketIo = io(serverUrl, options);
    
    socketIo.on('connect', () => {
      setIsConnected(true); 
      console.log('WebSocket conectado.');
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket desconectado');
    });

    // Listeners para eventos del servidor
    socketIo.on('readyRound', ({ loop, puntos }) => {
      console.log("llego el ready room, loop:",loop,"   puntos:", puntos)
      setGameData(prev => ({ ...prev, loop:loop, puntos:puntos, fase:0 }));
    });

    socketIo.on('sendProp', (prop) => {
      console.log("llego la propiedad, prop:",prop)
      setGameData(prev => ({ ...prev, propSeleccionada: prop, fase:1}));
    });

    socketIo.on('sendCardsYPoints', ({ cardsPlay, puntos }) => {
      console.log("llegaron las, cartas:",cardsPlay ,"  y los puntos:", puntos)
      setGameData(prev => ({ ...prev, cardsPlay, puntos, fase:2 }));
    });

    socketIo.on('endGame', (idJuego) => {
      setGameData(prev => ({ ...prev, idJuego:idJuego, fase:3 }));
      //Que reciba el idUser y el idJuego(juego.insert ID), postee el vinculo userXgame y luego
      //te envie a una pagina endGame, que recibe el idUser y el idJuego y muestre
    });

    // Guardar el socket en el estado
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl, JSON.stringify(options)]);

  // Funciones para emitir eventos al servidor
  const joinRoom = (idUser, username, idSala) => {
    console.log('Enviando joinRoom con idUser:', idUser, 'y idSala:', idSala);
    if (socket) socket.emit('joinRoom', { idUser, username, idSala });
  };

  const chooseProp = (prop, idSala) => {
    if (socket) socket.emit('chooseProp', prop, idSala);
  }; 

  const chooseCard = (card, idSala) => {
    if (socket) socket.emit('chooseCard', card, idSala);
  };

  const endRound = (puntos, loop, idSala) => {
    if (socket) socket.emit('endRound', puntos, loop, idSala);
  };

  return { socket, isConnected, gameData, joinRoom, chooseProp, chooseCard, endRound };
};

export { useSocket };
