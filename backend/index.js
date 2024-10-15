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
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001','http://localhost:4000']
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
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getSobres`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getCardModels`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getJuegos`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getJuegoXUsers`);
    console.log(`   [GET] http://localhost:${LISTEN_PORT}/getCards`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postUser`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postJuego`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postJuegoXUser`);
    console.log(`   [POST] http://localhost:${LISTEN_PORT}/postCard`);
});

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: ["http://localhost:3000","http://localhost:4000"],            	// Permitir el origen localhost:3000
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

app.get("/getUsers", async (req, res) => {
    try {
        const users = await MySQL.realizarQuery("SELECT * FROM Users");
        res.status(200).json(users);  // Respuesta con estado 200 y los usuarios en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });  // Error del servidor
    }
});
            
app.post("/postUser", async function (req, res) {  
    try {
        const { username, password, name, surname, mail, image } = req.body;

        // Inserción directa sin parametrización
        const query = `
            INSERT INTO Users (username, password, name, surname, money, mail, image) 
            VALUES ('${username}', '${password}', '${name}', '${surname}', 0, '${mail}', '${image}')
        `;

        await MySQL.realizarQuery(query);

        res.status(200).send({ success: true, message: "Usuario creado exitosamente." });
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        res.status(500).send({ success: false, message: "Error en el servidor." });
    }
});


// Actualizar usuario
app.put("/putUser", async function (req, res) {
    try {
        const { username, password, name, surname, money, mail, image, id } = req.body;

        const query = `
            UPDATE Users 
            SET username = '${username}', password = '${password}', name = '${name}', 
                surname = '${surname}', money = ${money}, mail = '${mail}', image = '${image}' 
            WHERE id = ${id}
        `;

        await MySQL.realizarQuery(query);

        res.status(200).send("Usuario actualizado con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

// Eliminar usuario
app.delete("/deleteUser", async function (req, res) {
    try {
        const { id } = req.body;

        const query = `DELETE FROM Users WHERE id = ${id}`;

        const result = await MySQL.realizarQuery(query);

        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).send("Usuario eliminado con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
});

// Obtener sobres
app.get("/getSobres", async (req, res) => {
    try {
        const sobres = await MySQL.realizarQuery("SELECT * FROM Sobre");
        res.status(200).json(sobres);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los sobres", error });
    }
});

// Obtener modelos de cartas
app.get("/getCardModels", async (req, res) => {
    try {
        const cards = await MySQL.realizarQuery("SELECT * FROM CardModels");
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tarjetas", error });
    }
});

// Obtener juegos
app.get("/getJuegos", async (req, res) => {
    try {
        const juegos = await MySQL.realizarQuery("SELECT * FROM Juego");
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los juegos", error });
    }
});

// Insertar un nuevo juego
app.post("/postJuego", async function (req, res) {
    try {
        const { winner } = req.body;

        const query = `INSERT INTO Juego (winner) VALUES ('${winner}')`;

        await MySQL.realizarQuery(query);

        res.status(201).send(true);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el juego", error });
    }
});

// Obtener relaciones de juegos y usuarios
app.get("/getJuegoXUsers", async (req, res) => {
    try {
        const juegoXUsers = await MySQL.realizarQuery("SELECT * FROM JuegoXUser");
        res.status(200).json(juegoXUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros", error });
    }
});

// Insertar relación entre juego y usuario
app.post("/postJuegoXUser", async function (req, res) {
    try {
        const { idUser, idJuego } = req.body;

        const query = `INSERT INTO JuegoXUser (idUser, idJuego) VALUES (${idUser}, ${idJuego})`;

        await MySQL.realizarQuery(query);

        res.status(201).send(true);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la relación", error });
    }
});

// Obtener cartas
app.get("/getCards", async (req, res) => {
    try {
        const cards = await MySQL.realizarQuery("SELECT * FROM Cards");
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las cartas", error });
    }
});

// Insertar nueva carta
app.post("/postCard", async function (req, res) {
    try {
        const { idModel, idUser, hand } = req.body;

        const query = `
            INSERT INTO Cards (idModel, idUser, hand) 
            VALUES (${idModel}, ${idUser}, '${hand}')
        `;

        await MySQL.realizarQuery(query);

        res.status(201).send(true);
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la carta", error });
    }
});
