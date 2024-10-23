/*CREATE DATABASE prueba;*/

USE prueba;

/*AVATAR*/

CREATE TABLE avatar(
    id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    es_gratuito BOOLEAN,
    PRIMARY KEY (id)
);

/*LOGIN 100%*/

CREATE TABLE usuario(
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    nickName VARCHAR(50) NOT NULL UNIQUE,
    avatarId INT NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (avatarId) REFERENCES avatar(id)
);

CREATE TABLE olvidasteContraseña(
    usuarioId INT AUTO_INCREMENT NOT NULL,
    codigo BIGINT NOT NULL UNIQUE,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioId) REFERENCES usuario(id)
);

CREATE TABLE sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaExpiracion TIMESTAMP NULL, 
    FOREIGN KEY (usuarioId) REFERENCES usuario(id)
);

/*TIENDA*/

CREATE TABLE compras (
    id INT AUTO_INCREMENT NOT NULL,
    usuarioId INT NOT NULL,
    avatarId INT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (usuarioId) REFERENCES usuario(id),
    FOREIGN KEY (avatarId) REFERENCES avatar(id)
);

/*MULTIJUGADOR 90%*/

CREATE TABLE dificultad(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE configuracion(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    dificultadId INT NOT NULL,
    rondas BIGINT NOT NULL,
    maximoJugadores BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dificultadId) REFERENCES dificultad(id)
);


CREATE TABLE sala(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    codigo INT NOT NULL UNIQUE,
    configuracionId INT NOT NULL,
    fechaCreacion TIMESTAMP NOT NULL,
    estadoSala VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (configuracionId) REFERENCES configuracion(id)
);

CREATE TABLE participacion(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    jugadorId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id) 
);

CREATE TABLE rondaSala(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    rondaNumero BIGINT NOT NULL,
    fechaIncio TIMESTAMP NOT NULL,
    fechaFin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id)
);

CREATE TABLE podioRonda(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    rondaSalaId INT NOT NULL,
    jugadorId INT NOT NULL,
    posicion SMALLINT NOT NULL,
    puntosObtenidos INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (rondaSalaId) REFERENCES rondaSala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id)
);

CREATE TABLE podioFinalSala(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    jugadorId INT NOT NULL,
    posicionFinal SMALLINT NOT NULL,
    puntosFInal BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id)
);

/*JUEGOS  90%*/

CREATE TABLE juego(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE niveles(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    juegoId INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    numero BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (juegoId) REFERENCES juego(id)
);

CREATE TABLE procesoNivel(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    nivelId INT NOT NULL,
    jugadorId INT NOT NULL,
    estadoNivel BOOLEAN NOT NULL,
    fechaJugada TIMESTAMP NOT NULL,
    puntacion BIGINT NOT NULL,
    tiempo TIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (nivelId) REFERENCES niveles(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id)
);

CREATE TABLE palabras(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    palabra VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE pistas(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    pista TEXT NOT NULL,
    palabraId INT NOT NULL,
    nivelId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (palabraId) REFERENCES palabras(id),
    FOREIGN KEY (nivelId) REFERENCES niveles(id)
);

/*PODIOS*/



/*TIENDA*/

