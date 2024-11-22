CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    money INT DEFAULT 0,
    mail VARCHAR(100) NOT NULL,
	image TEXT
);

INSERT INTO Users (username, password, name, surname, money, mail, image) VALUES
('admin', '123', 'John', 'Doe', 1000, 'jdoe@example.com', 'image1.jpg'),
('asmith', 'password2', 'Alice', 'Smith', 500, 'asmith@example.com', 'image2.jpg'),
('mjones', 'password3', 'Mark', 'Jones', 300, 'mjones@example.com', 'image3.jpg');

select * from Users;

CREATE TABLE Sobre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

INSERT INTO Sobre (name, price) VALUES
('Común', 100),
('Especial', 250),
('Rara', 500),
('Épica', 1000),
('Legendaria', 1500),
('Flashback', 1800),
('Future Star', 2000),
('Aleatorio', 2250),
('Icónica', 2500),
('Gold', 3000);


CREATE TABLE CardModels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    materia VARCHAR(50),
    img text,
    calidad VARCHAR(50),
    carisma INT,
    conocimiento INT,
    experiencia INT,
    paciencia INT,
    popularidad INT,
    autoridad INT
);

INSERT INTO CardModels (nombre, materia, img, calidad, carisma, conocimiento, experiencia, paciencia, popularidad, autoridad) VALUES
('Ceferino Namuncurá', 'Religión', 'ceferino_namuncura.jpg', 'Icónica', 83, 46, 48, 95, 98, 46),
('Pedro Naboni', 'Filosofía', 'pedro_naboni.jpg', 'Común', 21, 37, 54, 73, 18, 60),
('Martín Giambroni', 'Política', 'martin_giambroni.jpg', 'Rara', 84, 39, 67, 12, 77, 53),
('Juan Manuel Naddeo', 'Físico-química', 'juan_manuel_naddeo.jpg', 'Épica', 82, 65, 35, 68, 35, 55),
('Flavio Sturla', 'Historia', 'flavio_sturla.jpg', 'Legendaria', 73, 92, 38, 21, 56, 88),
('Mariano Bennassar', 'Lengua', 'mariano_bennassar.jpg', 'Especial', 45, 64, 37, 79, 72, 29);

update CardModels
set img=""
where id=5;

CREATE TABLE Juego (
    id INT AUTO_INCREMENT PRIMARY KEY,
    winner INT NULL, -- Permite valores NULL para el ganador
    points INT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (winner) REFERENCES Users(id) ON DELETE SET NULL
);


INSERT INTO Juego (winner) VALUES 
(1),    -- Juego 1: Ganador es el usuario con id 1
(2); -- Juego 2: No hay ganador (NULL)

select * from Juego;
CREATE TABLE JuegoXUser (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idJuego INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (idJuego) REFERENCES Juego(id) ON DELETE CASCADE
);

INSERT INTO JuegoXUser (idUser, idJuego) VALUES
(1, 1),  -- Usuario 1 jugó en el Juego 1
(2, 1),  -- Usuario 2 jugó en el Juego 1
(3, 1),
(1, 2),  -- Usuario 1 jugó en el Juego 2
(2, 2);  -- Usuario 2 jugó en el Juego 2


CREATE TABLE Cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idModel INT NOT NULL,
    idUser INT NOT NULL,
    hand BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idModel) REFERENCES CardModels(id) ON DELETE CASCADE,
    FOREIGN KEY (idUser) REFERENCES Users(id) ON DELETE CASCADE
);
-- Cartas para el Usuario 1
INSERT INTO Cards (idModel, idUser, hand) VALUES
(1, 1, FALSE),   -- Usuario 1 tiene laS siguientes cartas
(2, 1, TRUE),  
(3, 1, FALSE),  
(4, 1, TRUE),   
(5, 1, TRUE),  
(7, 1, TRUE)
(8, 1, TRUE)
-- Cartas para el Usuario 2
(2, 2, TRUE),   -- Usuario 2 tiene las siguientes cartas
(3, 2, FALSE),  
(4, 2, TRUE),  
(5, 2, TRUE), 
(6, 2, TRUE),   
(7, 2, TRUE),
(6, 2, FALSE),
-- Cartas para el Usuario 3
(1, 3, TRUE),  -- Usuario 3 tiene la carta 1 fuera de mano
(3, 3, TRUE),   -- Usuario 3 tiene la carta 3 en mano
(5, 3, TRUE),   -- Usuario 3 tiene la carta 5 en mano
(6, 3, TRUE),  -- Usuario 3 tiene la carta 6 fuera de mano
(4, 3, TRUE);  -- Usuario 3 tiene la carta 4 fuera de mano
(8, 3, FALSE);  -- Usuario 3 tiene la carta 4 fuera de mano


