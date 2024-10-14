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
        // Consulta preparada para evitar inyección de SQL
        await MySQL.realizarQuery(
            `INSERT INTO Users (username, password, name, surname, money, mail, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [req.body.username, req.body.password, req.body.name, req.body.surname, req.body.money || 0, req.body.mail, req.body.image]
        );
        res.status(201).send(true);  // Respuesta exitosa con estado 201 (creado)
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el usuario", error });
    }
});

app.put("/putUser", async function (req, res) {
    try {
        // Consulta preparada para evitar inyección de SQL
        await MySQL.realizarQuery(
            `UPDATE Users 
             SET username = ?, password = ?, name = ?, surname = ?, money = ?, mail = ?, image = ? 
             WHERE id = ?`,
            [req.body.username, req.body.password, req.body.name, req.body.surname, req.body.money, req.body.mail, req.body.image, req.body.id]
        );
        res.status(200).send("Usuario actualizado con éxito.");  // Respuesta exitosa
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

app.delete("/deleteUser", async function (req, res) {
    try {
        // Consulta preparada para eliminar un usuario por su id
        const result = await MySQL.realizarQuery(
            `DELETE FROM Users WHERE id = ?`,
            [req.body.id]  // Pasamos el ID del usuario que se desea eliminar
        );

        // Verificamos si realmente se eliminó algún registro
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).send("Usuario eliminado con éxito.");
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
});

app.get("/getSobres", async (req, res) => {
    try {
        const sobres = await MySQL.realizarQuery("SELECT * FROM Sobre");
        res.status(200).json(sobres);  // Respuesta exitosa con los sobres en formato JSON
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los sobres", error });
    }
});

app.post("/postSobre", async function (req, res) {  
    try {
        // Consulta preparada para insertar un nuevo sobre
        await MySQL.realizarQuery(
            `INSERT INTO Sobre (name, price) VALUES (?, ?)`,
            [req.body.name, req.body.price]  // Valores pasados desde el cuerpo de la solicitud
        );
        res.status(201).send(true);  // Respuesta exitosa, estado 201 (creado)
    } catch (error) {
        res.status(500).json({ message: "Error al insertar el sobre", error });
    }
});

app.put("/putSobre", async function (req, res) {
    try {
        // Consulta preparada para actualizar un sobre
        await MySQL.realizarQuery(
            `UPDATE Sobre 
             SET name = ?, price = ? 
             WHERE id = ?`,
            [req.body.name, req.body.price, req.body.id]  // Valores del cuerpo de la solicitud
        );
        res.status(200).send("Sobre actualizado con éxito.");  // Respuesta exitosa
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el sobre", error });
    }
});

app.delete("/deleteSobre", async function (req, res) {
    try {
        // Consulta preparada para eliminar un sobre
        const result = await MySQL.realizarQuery(
            `DELETE FROM Sobre WHERE id = ?`,
            [req.body.id]  // ID del sobre que se quiere eliminar
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sobre no encontrado" });  // Si no se encontró el sobre
        }

        res.status(200).send("Sobre eliminado con éxito.");  // Respuesta exitosa
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el sobre", error });
    }
});
