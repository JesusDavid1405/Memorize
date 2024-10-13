/*CREATE DATABASE TESTAQUA;*/
USE TESTAQUA;
/*LOGIN*/

CREATE TABLE usuario(
    id INT NOT NULL UNIQUE,
    nickName VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE login(
    usuarioId INT NOT NULL,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioId) REFERENCES usuario(id)
);

CREATE TABLE olvidasteContraseña(
    usuarioId INT NOT NULL,
    codigo BIGINT NOT NULL UNIQUE,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioId) REFERENCES usuario(id)
);

/*MULTIJUGADOR*/

CREATE TABLE dificultad(
    id INT NOT NULL UNIQUE,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT NOT NULL
);

INSERT INTO dificultad 
VALUES
(1,"Facil","El modo fácil es para los jugadores que están empezando a conocer el juego o que quieren jugar de manera más tranquila. En este modo, hay menos cartas y más tiempo para memorizar, lo que ayuda a los jugadores a recordar dónde están las cartas sin sentirse presionados."),
(2,"Medio","El modo medio está diseñado para jugadores que ya tienen algo de experiencia con el juego y buscan un desafío moderado. Este modo aumenta la dificultad al introducir más cartas y un tiempo limitado para memorizar, lo que añade emoción y reto a la partida."),
(3,"Dificil","El modo difícil está diseñado para jugadores que buscan un verdadero desafío. Este modo pone a prueba la memoria y la concentración, con más cartas, menos tiempo para memorizar y sin pistas, ofreciendo una experiencia intensa y competitiva.");

CREATE TABLE configuracion(
    id INT NOT NULL UNIQUE,
    dificultadId INT NOT NULL,
    rondas BIGINT NOT NULL,
    maximoJugadores BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dificultadId) REFERENCES dificultad(id)
);


CREATE TABLE sala(
    id INT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    codigo INT NOT NULL UNIQUE,
    fechaCreacion TIMESTAMP NOT NULL,
    estadoSala VARCHAR(30) NOT NULL
);

CREATE TABLE participacion(
    id INT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    jugadorId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id) 
);

CREATE TABLE rondaSala(
    id INT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    rondaNumero BIGINT NOT NULL,
    fechaIncio TIMESTAMP NOT NULL,
    fechaFin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id)
);

CREATE TABLE podioRonda(
    id INT NOT NULL UNIQUE,
    rondaSalaId INT NOT NULL,
    jugadorId INT NOT NULL,
    posicion SMALLINT NOT NULL,
    puntosObtenidos INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (rondaSalaId) REFERENCES rondaSala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id)
);

CREATE TABLE podioFinalSala(
    id INT NOT NULL UNIQUE,
    salaId INT NOT NULL,
    jugadorId INT NOT NULL,
    posicionFinal SMALLINT NOT NULL,
    puntosFInal BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (salaId) REFERENCES sala(id),
    FOREIGN KEY (jugadorId) REFERENCES usuario(id)
);

/*JUEGOS*/

CREATE TABLE juego(
    id INT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE niveles(
    id INT NOT NULL UNIQUE,
    juegoId INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    numero BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (juegoId) REFERENCES juego(id)
);

CREATE TABLE procesoNivel(
    id INT NOT NULL UNIQUE,
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

/*PODIOS*/