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
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:4000/');
    console.log('   [GET] http://localhost:4000/getUsers');
    console.log('   [GET] http://localhost:4000/getChats');
    console.log('   [GET] http://localhost:4000/getChatXUser');
    console.log('   [GET] http://localhost:4000/getMensajes');
    console.log('   [POST] http://localhost:4000/postUser')
    console.log('   [POST] http://localhost:4000/postMensaje')
});;

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

app.get("/getUsers", async function (req, res) {
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM usersG`);
    res.send(respuesta);
});


// GET para obtener los chats
app.get("/getChats", async function (req, res) {
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM chatsG`);
    res.send(respuesta);
});

// GET para obtener las relaciones entre usuarios y chats
app.get("/getChatXuser", async function (req, res) {
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM chatXUserG`);
    res.send(respuesta);
});

// GET para obtener los mensajes
app.get("/getMensajes", async function (req, res) {
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM mensajesG`);
    res.send(respuesta);
});
            
app.post("/postUser", async function (req, res) {  
    await MySQL.realizarQuery(
      `INSERT INTO usersG (nombre, apellido, username, password, mail, image) VALUES
       ('${req.body.firstName}','${req.body.lastName}','${req.body.username}','${req.body.password}','${req.body.email}','${req.body.image}')`
    );
  
    res.send(true);
});

app.post("/postMensaje", async function (req, res) {  
    await MySQL.realizarQuery(
      `INSERT INTO mensajesG (fecha, content, idChatXUser) VALUES
      ('${req.body.fecha}', '${req.body.content}', ${req.body.idChatXUser})`
    );
  
    res.send(true);
});

app.put('/putUser', async function(req, res) {
    await MySQL.realizarQuery(
      `UPDATE usersG
        SET nombre = '${req.body.nombre}',
        apellido = '${req.body.apellido}',
        username = '${req.body.username}',
        password = '${req.body.password}',
        mail = '${req.body.mail}',
        image = '${req.body.image}'
        WHERE id = ${req.body.id}`
    );
 
    res.send("Usuario actualizado con éxito.");
});




