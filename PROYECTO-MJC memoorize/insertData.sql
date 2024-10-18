INSERT INTO avatar (id, nombre, imagen, precio, es_gratuito)
VALUES
(1, 'Guerrero', 'guerrero.png', 5.99, FALSE),
(2, 'Mago', 'mago.png', 0.00, TRUE),
(3, 'Arquero', 'arquero.png', 3.49, FALSE);


INSERT INTO usuario (id, nickName, avatarId, correo, contraseña)
VALUES
(1, 'PlayerOne', 1, 'playerone@example.com', 'password123'),
(2, 'PlayerTwo', 2, 'playertwo@example.com', 'password456');


INSERT INTO olvidasteContraseña (usuarioId, codigo)
VALUES (1, 123456789012345),
(2, 987654321098765);


INSERT INTO compras (id, usuarioId, avatarId)
VALUES
(1, 1, 1),
(2, 2, 2);


INSERT INTO dificultad (id, nombre, descripcion)
VALUES
(1, 'Fácil', 'Nivel de dificultad fácil'),
(2, 'Difícil', 'Nivel de dificultad difícil');


INSERT INTO configuracion (id, dificultadId, rondas, maximoJugadores)
VALUES
(1, 1, 3, 4),
(2, 2, 5, 6);


INSERT INTO sala (id, nombre, codigo, configuracionId, fechaCreacion, estadoSala)
VALUES
(1, 'Sala 1', 1234, 1, CURRENT_TIMESTAMP, 'Activa'),
(2, 'Sala 2', 5678, 2, CURRENT_TIMESTAMP, 'Inactiva');


INSERT INTO participacion (id, salaId, jugadorId)
VALUES
(1, 1, 1),
(2, 2, 2);


INSERT INTO rondaSala (id, salaId, rondaNumero, fechaIncio)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP),
(2, 2, 1, CURRENT_TIMESTAMP);


INSERT INTO podioRonda (id, rondaSalaId, jugadorId, posicion, puntosObtenidos)
VALUES
(1, 1, 1, 1, 100),
(2, 1, 2, 2, 80);


INSERT INTO juego (id, nombre, descripcion)
VALUES
(1, 'Aventura', 'Juego de aventura'),
(2, 'Puzzle', 'Juego de puzzles');


INSERT INTO niveles (id, juegoId, nombre, numero)
VALUES
(1, 1, 'Nivel 1', 1),
(2, 2, 'Nivel 2', 2);


INSERT INTO procesoNivel (id, nivelId, jugadorId, estadoNivel, fechaJugada, puntacion, tiempo)
VALUES
(1, 1, 1, TRUE, CURRENT_TIMESTAMP, 1000, '00:05:00'),
(2, 2, 2, FALSE, CURRENT_TIMESTAMP, 500, '00:10:00');


INSERT INTO palabras (id, palabra)
VALUES
(1, 'Sol'),
(2, 'Luna');


INSERT INTO pistas (id, pista, palabraId)
VALUES
(1, 'Estrella que ilumina el día', 1),
(2, 'Satélite natural de la Tierra', 2);
