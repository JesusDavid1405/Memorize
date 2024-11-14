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
(1, 'Son pequeñas masas de tierra rodeadas por agua.'), -- 'islas'
(1, 'Algunas islas son tropicales y tienen playas.'),
(1, 'Las islas pueden formar archipiélagos.'),

(2, 'Se usan para mover una embarcación en el agua.'),  -- 'remos'
(2, 'Tienen una parte plana que se hunde en el agua.'),
(2, 'Son herramientas manuales, opuestas a los motores.'),

(3, 'Es un verbo que significa navegar con remos.'),  -- 'bogar'
(3, 'Se puede hacer en canoas o botes pequeños.'),
(3, 'Requiere esfuerzo físico para mover la embarcación.'),

(4, 'Se refiere al peso o volumen que se transporta.'), -- 'carga'
(4, 'Puede ser cargada en un barco, camión o avión.'),
(4, 'Es un término común en logística y transporte.'),

(5, 'Es un hilo fuerte usado para pescar.'), -- 'sedal'
(5, 'Generalmente, está hecho de nylon o materiales sintéticos.'),
(5, 'Se conecta al anzuelo en las cañas de pescar.'),

(6, 'Es la actividad de capturar peces.'), -- 'pesca'
(6, 'Se puede realizar con redes, anzuelos o trampas.'),
(6, 'Es una fuente de alimento para muchas culturas.'),

(7, 'Es un arma o herramienta utilizada para pescar grandes animales marinos.'), -- 'arpon'
(7, 'Tiene una punta afilada que se clava en el objetivo.'),
(7, 'Se usa en deportes acuáticos como la caza submarina.'),

(8, 'Es una gran roca que sobresale de la tierra o el mar.'), -- 'peñon'
(8, 'A menudo se encuentra en costas rocosas o islas.'),
(8, 'Suelen ser peligrosos para la navegación.'),

(9, 'Es una prenda de ropa típica en zonas tropicales.'), -- 'pareo'
(9, 'Generalmente es de tela ligera y se usa en la playa.'),
(9, 'Se puede envolver alrededor del cuerpo como falda o vestido.'),

(10, 'Es uno de los puntos cardinales.'), -- 'oeste'
(10, 'Se opone al este en la brújula.'),
(10, 'El sol se pone en esta dirección.'),

(11, 'Son plantas marinas que crecen en el agua.'), -- 'algas'
(11, 'Algunas algas se usan como alimento en Asia.'),
(11, 'Pueden ser de diferentes colores, como verde, roja o marrón.'),

(12, 'Es una estructura que retiene agua, como en un río.'), -- 'presa'
(12, 'También puede referirse a un animal capturado durante la caza.'),
(12, 'Se utiliza para controlar el flujo de agua y generar energía.'),

(13, 'Se usa para mantener una embarcación en su lugar.'), -- 'ancla'
(13, 'Generalmente está hecha de metal y se lanza al agua.'),
(13, 'Se utiliza para evitar que el barco se desplace por el viento o las corrientes.'),

(14, 'Es una vía artificial de agua que conecta dos cuerpos acuáticos.'), -- 'canal'
(14, 'A menudo se usa para navegación y transporte de mercancías.'),
(14, 'Los canales son comunes en países bajos como los Países Bajos.'),

(15, 'Es un organismo marino que forma arrecifes.'), -- 'coral'
(15, 'Los corales son muy importantes para los ecosistemas marinos.'),
(15, 'Tienen colores brillantes y a menudo se asocian con la vida marina diversa.'),

(16, 'Es una formación geológica formada por la erosión del agua.'), -- 'cañon'
(16, 'Puede ser profundo y estrecho, con paredes rocosas empinadas.'),
(16, 'Algunos cañones, como el Gran Cañón, son famosos por su belleza.'),

(17, 'Es una entrada de mar rodeada parcialmente por tierra.'), -- 'bahía'
(17, 'Generalmente es más tranquila que el mar abierto.'),
(17, 'Las bahías a menudo se utilizan como puertos naturales.'),

(18, 'Es una franja de tierra cubierta de arena junto al mar.'), -- 'playa'
(18, 'A menudo es un destino turístico popular.'),
(18, 'Las playas pueden ser de arena fina o gruesa, dependiendo del lugar.'),

(19, 'Es una estructura flotante hecha de madera o materiales similares.'), -- 'balsa'
(19, 'Se utiliza para cruzar ríos o como medio de transporte improvisado.'),
(19, 'Las balsas también son comunes en actividades recreativas en el agua.'),

(20, 'Es un pequeño crustáceo marino.'), -- 'krill'
(20, 'Forma una parte importante de la dieta de ballenas y focas.'),
(20, 'Se encuentra en grandes cantidades en los océanos.'),

(21, 'Es uno de los puntos cardinales.'), -- 'norte'
(21, 'Se opone al sur en la brújula.'),
(21, 'En el hemisferio norte, es la dirección donde se encuentra el Polo Norte.'),

(22, 'Es una gran extensión de mar rodeada parcialmente por tierra.'), -- 'golfo'
(22, 'Los golfos suelen ser más grandes que las bahías.'),
(22, 'El Golfo de México es uno de los más conocidos a nivel mundial.');

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
