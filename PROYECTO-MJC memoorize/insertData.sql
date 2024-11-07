INSERT INTO  juegos (nombre, descripcion, imagen, maximoNiveles)
VALUES
('Rompecabezas','Arma el enigma','rompecabeza.jpeg',8),
('Wordle','Encuentras palabras','wordle.jpeg',8),
('Multijugador','Salas','multijugador.jpeg',0);

INSERT INTO `avatares` (`nombre`, `imagen`, `valor`) 
VALUES 
('rockera','avatar1.png','0'),
('pijama','avatar2.png','0'),
('gimnasta','avatar3.png','0'),
('crespos','avatar4.png','0'),
('jefe','avatar5.png','0'),
('gafaSol','avatar6.png','0'),
('sacerdote','avatar7.png','0'),
('Lia', 'pruebac.png', '350'), 
('Agua', 'pruebad.png', '150'),
('Leo', 'pruebaq.png', '300'), 
('Licon', 'pruebax.png', '250'), 
('Bmo', 'pruebaxi.png', '300'), 
('Mark', 'pruebaz.png', '250');

INSERT INTO `niveles` (`nombre`, `numero`) 
VALUES 
('nivel 1','1'),
('nivel 2','2'),
('nivel 3','3'),
('nivel 4','4'),
('nivel 5','5'),
('nivel 6','6'),
('nivel 7','7'),
('nivel 8','8');

INSERT INTO `palabra` (`palabra`) VALUES 
('arena'), ('marea'), ('barco'), ('brisa'), ('babor'), ('nadar'), ('timon'), ('costa'),
('cofre'), ('faros'), ('islas'), ('remos'), ('bogar'), ('carga'), ('sedal'), ('pesca'),
('arpon'), ('peñon'), ('pareo'), ('oeste'), ('algas'), ('presa'), ('ancla'), ('canal'),
('coral'), ('cañon'), ('bahía'), ('playa'), ('balsa'), ('krill'), ('norte'), ('golfo'),
('pirata'), ('viento'), ('galeon'), ('tesoro'), ('sirena'), ('oceano'), ('puerto'),
('triton'), ('rancho'), ('averia'), ('deriva'), ('espuma'), ('aletas'), ('estela'), 
('laguna'), ('islote'), ('concha'), ('medusa'), ('abisal'), ('calado'), ('goleta'),
('orilla'), ('muelle'), ('resaca'), ('marina'), ('ostras'),
('olas'), ('vela'), ('isla'), ('faro'), ('proa'), ('popa'), ('mapa'), ('nudo'), 
('lino'), ('azul'), ('boya'), ('cabo'), ('lago'), ('fosa'), ('este'), ('yate'),
('remo'), ('lodo'), ('pico'), ('roca'), ('agua'), ('bojo');

-- Nivel 1 (5 letras)
INSERT INTO `palabraNivel` (`palabraId`, `nivelId`) VALUES 
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1), 
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1), (18, 1), (19, 1), 
(20, 1), (21, 1), (22, 1), (23, 1), (24, 1), (25, 1), (26, 1), (27, 1), (28, 1), 
(29, 1), (30, 1), (31, 1), (32, 1);

-- Nivel 2 (6 letras)
INSERT INTO `palabraNivel` (`palabraId`, `nivelId`) VALUES 
(33, 2), (34, 2), (35, 2), (36, 2), (37, 2), (38, 2), (39, 2), (40, 2), (41, 2), 
(42, 2), (43, 2), (44, 2), (45, 2), (46, 2), (47, 2), (48, 2), (49, 2), (50, 2), 
(51, 2), (52, 2), (53, 2), (54, 2), (55, 2), (56, 2), (57, 2), (58, 2);

-- Nivel 3 (4 letras)
INSERT INTO `palabraNivel` (`palabraId`, `nivelId`) VALUES 
(59, 3), (60, 3), (61, 3), (62, 3), (63, 3), (64, 3), (65, 3), (66, 3), (67, 3), 
(68, 3), (69, 3), (70, 3), (71, 3), (72, 3), (73, 3), (74, 3), (75, 3), (76, 3), 
(77, 3), (78, 3), (79, 3), (80, 3);


-- Arena
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(1, 'Es un grano diminuto que forma playas'), 
(1, 'La encuentras en el desierto y en la costa'), 
(1, 'Se desliza entre los dedos y es cálida al sol');

-- Marea
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(2, 'Sube y baja en ciclos'), 
(2, 'Es influenciada por la luna'), 
(2, 'Afecta la costa y el nivel del agua');

-- Barco
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(3, 'Medio de transporte sobre el agua'), 
(3, 'Tiene timón y velas en algunos casos'), 
(3, 'Se utiliza para navegar los mares');

-- Brisa
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(4, 'Es un viento suave y refrescante'), 
(4, 'Sientes su frescura en la costa'), 
(4, 'Normalmente acompaña a la puesta de sol en la playa');

-- Babor
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(5, 'Es la izquierda en términos náuticos'), 
(5, 'Lo opuesto de estribor en un barco'), 
(5, 'Una orientación de lado en el mar');

-- Nadar
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(6, 'Actividad común en el agua'), 
(6, 'Puedes hacerlo en el mar o en una piscina'), 
(6, 'Requiere movimiento de brazos y piernas');

-- Timon
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(7, 'Se usa para dirigir un barco'), 
(7, 'Es un volante, pero del océano'), 
(7, 'Capitanes lo manejan para guiar su nave');

-- Costa
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(8, 'Es el límite entre la tierra y el mar'), 
(8, 'Normalmente tiene playas o acantilados'), 
(8, 'Donde las olas tocan la tierra');

-- Cofre
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(9, 'Puede contener un tesoro pirata'), 
(9, 'Suele ser de madera y estar cerrado con llave'), 
(9, 'Algo que buscan los cazadores de tesoros');

-- Faros
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(10, 'Guía a los barcos en la oscuridad'), 
(10, 'Suele estar en torres altas cerca del mar'), 
(10, 'Tiene una luz giratoria potente');

-- Pirata
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(33, 'Navegante que busca tesoros en el mar'), 
(33, 'Lleva parche en el ojo y a veces loro en el hombro'), 
(33, 'Famoso por saquear y decir "¡Argh!"');

-- Viento
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(34, 'Movimiento del aire que impulsa las velas'), 
(34, 'Sientes su fuerza cuando estás en el mar'), 
(34, 'Es responsable de las olas y las tormentas');

-- Galeon
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(35, 'Barco antiguo, usado en exploraciones'), 
(35, 'Tiene velas grandes y madera fuerte'), 
(35, 'Nave de los descubridores del Nuevo Mundo');

-- Tesoro
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(36, 'Lo que buscan los piratas y exploradores'), 
(36, 'Suele estar guardado en un cofre escondido'), 
(36, 'Contiene oro, joyas o riquezas valiosas');

-- Sirena
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(37, 'Criatura mitad pez, mitad humana'), 
(37, 'Canta para atraer a los marineros'), 
(37, 'Aparece en historias y leyendas del mar');

-- Olas
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(59, 'Formaciones de agua en movimiento'), 
(59, 'Rompen en la orilla y son constantes'), 
(59, 'Las surfistas las adoran');

-- Vela
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(60, 'Impulsa los barcos con viento'), 
(60, 'Hecha de tela, se despliega en los mástiles'), 
(60, 'Fundamental en la navegación sin motor');

-- Isla
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(61, 'Territorio rodeado de agua'), 
(61, 'Suele ser pequeño y solitario'), 
(61, 'Algunos la buscan como refugio en el mar');

-- Faro
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(62, 'Emite una luz para guiar a los navegantes'), 
(62, 'Está en torres cercanas a la costa'), 
(62, 'Funciona para evitar choques en la noche');

-- Proa
INSERT INTO `pista` (`palabraNivelId`, `pista`) VALUES 
(63, 'Parte frontal de una embarcación'), 
(63, 'Va delante en la dirección del viaje'), 
(63, 'Lo opuesto de la popa en el barco');
