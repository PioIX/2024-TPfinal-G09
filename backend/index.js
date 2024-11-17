var express = require ("express"); //Tipo de servidor: Express
const cors = require('cors');
var bodyParser = require("body-parser"); //Convierte los JSON
const MySQL = require("./modulos/mysql.js");//Declaro SQL
const session = require('express-session');// Para el manejo de las variables de sesión

// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024


const app = express();	
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001','http://localhost:3002']
}));								// Inicializo express para el manejo de las peticiones

app.use(bodyParser.urlencoded({ extended: false }));	// Inicializo el parser JSON
app.use(bodyParser.json());

const LISTEN_PORT = 3001;								// Puerto por el que estoy ejecutando la página Web

const server = app.listen(LISTEN_PORT, () => {
    console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
    console.log(`Servidor corriendo en el puerto ${LISTEN_PORT}`);
    console.log('Rutas definidas:');
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getUsers`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getUserById`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getSobres`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getCardModels`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getJuegos`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getJuegoXUsers`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getCards`);
    console.log(`   [PUT] http://localhost:${LISTEN_PORT}/putUser`);
    console.log(`   [PUT] http://localhost:${LISTEN_PORT}/putUserMoney`);
    console.log(`   [DELETE] http://localhost:${LISTEN_PORT}/deleteUser`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postUser`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postJuego`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postJuegoXUser`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postCard`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/getCardsByUser`);
});

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: ["http://localhost:3000","http://localhost:3001","http://localhost:3002"],            	// Permitir el origen localhost:3000
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

// Obtener users A
app.get("/getUsers", async (req, res) => {
    try {
        const users = await MySQL.realizarQuery("SELECT * FROM Users");
        res.status(200).json(users);  // Respuesta con estado 200 y los usuarios en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });  // Error del servidor
    }
});

app.get("/getUserById", async (req, res) => {
    if (!req.query.idUser) {
        return res.status(400).json({ message: "El parámetro idUser es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM Users WHERE id = '${req.query.idUser}'`;
        const user = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(user);
        console.log(user)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
});

// Obtener sobres A
app.get("/getSobres", async (req, res) => {
    try {
        const sobres = await MySQL.realizarQuery("SELECT * FROM Sobre");
        res.status(200).json(sobres);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los sobres", error });
    }
});

// Obtener modelos A
app.get("/getCardModels", async (req, res) => {
    try {
        const cards = await MySQL.realizarQuery("SELECT * FROM CardModels");
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tarjetas", error });
    }
});

// Obtener juegos A
app.get("/getJuegos", async (req, res) => {
    try {
        const juegos = await MySQL.realizarQuery("SELECT * FROM Juego");
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los juegos", error });
    }
});

app.get("/getJuegoById", async (req, res) => {
    if (!req.query.idJuego) {
        return res.status(400).json({ message: "El parámetro Juego es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM Juego WHERE id = '${req.query.idJuego}'`;
        const user = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(user);
        console.log(user)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Juego", error });
    }
});

// Obtener relaciones de juegos y usuarios A
app.get("/getJuegoXUsers", async (req, res) => {
    try {
        const juegoXUsers = await MySQL.realizarQuery("SELECT * FROM JuegoXUser");
        res.status(200).json(juegoXUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros", error });
    }
});

app.get("/getJuegoXUserById", async (req, res) => {
    if (!req.query.idJuegoXUser) {
        return res.status(400).json({ message: "El parámetro idJuegoXUser es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM JuegoXUser WHERE id = '${req.query.idJuegoXUser}'`;
        const user = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(user);
        console.log(user)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el idJuegoXUser", error });
    }
});

// Obtener cartas A
app.get("/getCards", async (req, res) => {
    try {
        const cards = await MySQL.realizarQuery("SELECT * FROM Cards");
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las cartas", error });
    }
});
   
app.get("/getCardsByUser", async (req, res) => {
    if (!req.query.idUser) {
        return res.status(400).json({ message: "El parámetro idUser es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM Cards WHERE idUser = '${req.query.idUser}'`;
        const cards = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las cartas", error });
    }
});

app.get("/getMazoByUser", async (req, res) => {
    if (!req.query.idUser) {
        return res.status(400).json({ message: "El parámetro idUser es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM Cards WHERE idUser = '${req.query.idUser} 'and hand=1`;
        const cards = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las cartas", error });
    }
});

app.get("/getGamesByUser", async (req, res) => {
    if (!req.query.idUser) {
        return res.status(400).json({ message: "El parámetro idUser es obligatorio" });
    }

    try {
        // Usamos una consulta SQL que filtre por el idUser
        const query = `SELECT * FROM JuegoXUser WHERE idUser = '${req.query.idUser}'`;
        const cards = await MySQL.realizarQuery(query); // Pa?samos idUser como parámetro para prevenir SQL Injection
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los juegos", error });
    }
});

// Actualizar plata usuario A
app.put("/putUserMoney", async function (req, res) {
    try {
        const query = `
            UPDATE Users 
            SET  money = ${req.body.money} 
            WHERE id = ${req.body.id}
        `;

        await MySQL.realizarQuery(query);

        res.status(200).send("Usuario actualizado con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

// Actualizar usuario A
app.put("/putUser", async function (req, res) {
    try {
        const query = `
            UPDATE Users 
            SET username = '${req.body.username}', password = '${req.body.password}', name = '${req.body.name}', 
                surname = '${req.body.surname}', mail = '${req.body.mail}', image = '${req.body.image}' 
            WHERE id = ${req.body.id}
        `;

        await MySQL.realizarQuery(query);

        res.status(200).send("Usuario actualizado con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

//Nuevo usuario A
app.post("/postUser", async function (req, res) {  
    try {
        const query = `
            INSERT INTO Users (username, password, name, surname, money, mail, image) 
            VALUES ('${req.body.username}', '${req.body.password}', '${req.body.name}', '${req.body.surname}', 0, '${req.body.mail}', '${req.body.image}')
        `;

        result=await MySQL.realizarQuery(query);

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        res.status(500).send({ success: false, message: "Error en el servidor." });
    }
});

// Actualizar plata usuario A
app.put("/putCardHand", async function (req, res) {
    try {
        const query = `
            UPDATE Cards 
            SET  hand = ${req.body.hand} 
            WHERE id = ${req.body.id}
        `;

        await MySQL.realizarQuery(query);

        res.status(200).send("Carta actualizada con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

// Insertar nueva carta A
app.post("/postCard", async function (req, res) {
    try {
        const query = `
            INSERT INTO Cards (idModel, idUser, hand) 
            VALUES (${req.body.idModel}, ${req.body.idUser}, '${req.body.hand}')
        `;

        card= await MySQL.realizarQuery(query);

        res.status(201).send(card);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la carta", error });
    }
});

// Insertar un nuevo juego A
app.post("/postJuego", async function (req, res) {
    try {
        const query = `INSERT INTO Juego (winner, points) VALUES ('${req.body.winner}', '${req.body.points}')`;

        const result = await MySQL.realizarQuery(query);

        res.status(201).send(result);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el juego", error });
    }
});

// Insertar relación entre juego y usuario A
app.post("/postJuegoXUser", async function (req, res) {
    try {
        const query = `INSERT INTO JuegoXUser (idUser, idJuego) VALUES (${req.body.idUser}, ${req.body.idJuego})`;

        // Ejecuta la consulta de inserción y guarda el ID insertado
        const result = await MySQL.realizarQuery(query);

        // result.insertId contiene el ID recién insertado en MySQL
        res.status(201).json({ success: true, insertId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la relación", error });
    }
});

const players = {}; // Guarda los jugadores en la sala y sus puntajes
const gameStatus = {}; // Estado del juego por sala
const loops = {}; // Guarda el loop actual de cada sala

io.on("connection", (socket) => {
    // Evento para que un jugador se una a una sala
    socket.on("joinRoom", ({ idUser, username, idSala }) => {
        socket.join(idSala);
        // Inicializa la sala si no existe
        if (!gameStatus[idSala]) {
            gameStatus[idSala] = { players: [], timer: null, loop: [], puntos: [], cardsPlay:[], round:1};
        }

        const room = gameStatus[idSala];
        room.players.push(idUser);
        
        // Crea el vector de puntos si es un nuevo jugador
        room.puntos.push({ idUser, username, puntaje: 0 });

        // Inicia el timer si es el segundo jugador y no hay 4 jugadores
        if (room.players.length > 1) {
           startGame(idSala);
        }
    });

    // Evento para seleccionar la propiedad
    socket.on("chooseProp", (prop, idSala) => {
        if (!idSala) return;
        
        io.to(idSala).emit("sendProp", prop);
        gameStatus[idSala].propSeleccionada = prop; 
    });

    // Evento para elegir una carta
    socket.on("chooseCard", (card, idSala) => {
        if (!idSala) return;
        const room = gameStatus[idSala];
        room.cardsPlay.push(card);
        
        // Si todos los jugadores enviaron sus cartas, determina el ganador
        if (room.cardsPlay.length === room.players.length) {
            const winnerCards = determineWinner(room.cardsPlay, room.propSeleccionada);
            // Marcar las cartas ganadoras
            winnerCards.forEach(card => card.winner = true);

            if (winnerCards.length == 1) {
            // Solo un ganador, suma 3 puntos
                const singleWinner = room.puntos.find(p => p.idUser == winnerCards[0].playerId);
                if (singleWinner) singleWinner.puntaje += 3;

            } else {
                // Más de un ganador, suma 1 punto a cada uno
                winnerCards.forEach(card => {
                const winner = room.puntos.find(p => p.idUser == card.playerId);
                if (winner) winner.puntaje += 1;
                });
            }
            io.to(idSala).emit("sendCardsYPoints", { cardsPlay: room.cardsPlay, puntos: room.puntos });
            console.log(room.cardsPlay)
            room.cardsPlay = []; // Reinicia el vector de cartas jugadas para la próxima ronda
        }
    });

    // Evento para finalizar la ronda y rotar el loop
    socket.on("endRound", async(puntos, loop, idSala) => {
        if (!idSala) return;
        const room = gameStatus[idSala];
        room.loop=loop
        room.puntos=puntos
        room.round++
        if (room.round > 5) {
            const winner = room.puntos.reduce((max, player) => player.puntaje > max.puntaje ? player : max, room.puntos[0]);
            const newJuego = { winner: winner.idUser, points: winner.puntaje }
            const idJuego = await insertJuego(newJuego)
            io.to(idSala).emit("endGame", idJuego);
            resetRoom(idSala); // Reinicia el estado de la sala
        } else {
            // Rota el loop y envía la siguiente ronda
            room.loop.push(room.loop.shift()); // Rota el loop
            io.to(idSala).emit("readyRound", { loop: room.loop, puntos: room.puntos });
        }
    });
});

//Funcion como fetch pero dentro del back que arma el juego
async function insertJuego(newJuego) {
    try {
      const response = await fetch(`http://localhost:${LISTEN_PORT}/postJuego`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJuego),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response) {
        throw new Error('Error al registrar el juego');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result.insertId;
    } catch (error) {
      console.error('Error en insertJuego:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
}

// Función para inicializar el juego
function startGame(idSala) {
    console.log("iniciando partida con", idSala)
    const room = gameStatus[idSala];
    room.loop = [...room.players]; // Inicializa el loop con los jugadores
    console.log("sala ", room)
    io.to(idSala).emit("readyRound", { loop: room.loop, puntos: room.puntos });
}

// Función para determinar la carta ganadora
function determineWinner(cards, prop) {
    // Encuentra el valor máximo de la propiedad seleccionada
    const maxValue = Math.max(...cards.map(card => card[prop]));

    // Retorna todas las cartas que tengan el valor máximo en la propiedad seleccionada
    return cards.filter(card => card[prop] === maxValue);
}


// Función para resetear el estado de la sala al final del juego
function resetRoom(idSala) {
    delete gameStatus[idSala];
}

