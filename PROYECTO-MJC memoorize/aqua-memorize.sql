USE aquamemorize;

CREATE TABLE usuarios(
	id int NOT NULL UNIQUE AUTO_INCREMENT,
    nickName varchar(50) NOT NULL,
    gmail varchar(200) NOT NULL,
    contraseña varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE login(
	usuarioId int NOT NULL,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioid) REFERENCES Usuarios(id)
);

CREATE TABLE recuperarContraseña(
	usuarioId int NOT NULL,
    codigoRecuperacion int NOT NULL UNIQUE,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioid) REFERENCES Usuarios(id)
);

CREATE TABLE sala(
	id int NOT NULL UNIQUE AUTO_INCREMENT,
    nombre varchar(30) NOT NULL,
    codigo bigint NOT NULL,
    fechaCreacion timestamp NOT NULL,
    estadoSala varchar(30) NOT NULL DEFAULT "abierta" 
);

CREATE TABLE Participaciones (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    sala_id int NOT NULL,
    usuario_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sala_id) REFERENCES Salas(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE juego(
	id int NOT NULL UNIQUE AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    descripcion text NOT NULL,
    comoJugar text NOT NULL,
    PRIMARY KEY (id)
);


