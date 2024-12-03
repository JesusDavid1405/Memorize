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

INSERT INTO `niveles` (`nombre`, `numero`,`tiempo`) 
VALUES 
('nivel 1','1',60),
('nivel 2','2',50),
('nivel 3','3',45),
('nivel 4','4',40),
('nivel 5','5',35),
('nivel 6','6',40),
('nivel 7','7',40),
('nivel 8','8',40);

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

INSERT INTO `palabraNivel` (`palabraId`, `nivelId`) VALUES 
(1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (6, 4), (7, 4), (8, 4), (9, 4), (10, 4), 
(11, 4), (12, 4), (13, 4), (14, 4), (15, 4), (16, 4), (17, 4), (18, 4), (19, 4), 
(20, 4), (21, 4), (22, 4), (23, 4), (24, 4), (25, 4), (26, 4), (27, 4), (28, 4), 
(29, 4), (30, 4), (31, 4), (32, 4);


INSERT INTO `pista` (`palabraId`, `pista`) VALUES
    -- Pistas para "arena"
    (1, 'Material fino que cubre las playas y costas.'),
    (1, 'Componente esencial de las playas.'),
    (1, 'Puede estar seca o mojada por el agua del mar.'),

    -- Pistas para "marea"
    (2, 'Movimiento regular de subida y bajada del mar.'),
    (2, 'Causado por la atracción de la luna.'),
    (2, 'Afecta la altura del agua en las costas.'),

    -- Pistas para "barco"
    (3, 'Embarcación que navega en el agua.'),
    (3, 'Medio de transporte marítimo.'),
    (3, 'Puede ser grande o pequeño y tiene un casco.'),

    -- Pistas para "brisa"
    (4, 'Viento suave que se siente cerca del mar.'),
    (4, 'Sopla en la costa y refresca.'),
    (4, 'Común en las tardes junto al mar.'),

    -- Pistas para "babor"
    (5, 'Lado izquierdo de una embarcación mirando hacia la proa.'),
    (5, 'Contrario a estribor en un barco.'),
    (5, 'Se usa para dirección en navegación.'),

    -- Pistas para "nadar"
    (6, 'Actividad de moverse en el agua.'),
    (6, 'Se practica en el mar, ríos o piscinas.'),
    (6, 'Involucra movimientos coordinados de brazos y piernas.'),

    -- Pistas para "timon"
    (7, 'Mecanismo para dirigir un barco.'),
    (7, 'Utilizado por el capitán o timonel.'),
    (7, 'Controla la dirección de la nave.'),

    -- Pistas para "costa"
    (8, 'Línea donde el mar se encuentra con la tierra.'),
    (8, 'Zona de transición entre tierra y océano.'),
    (8, 'Área común para turistas y pescadores.'),

    -- Pistas para "cofre"
    (9, 'Caja donde se guardan tesoros.'),
    (9, 'Objeto buscado por piratas.'),
    (9, 'Suele estar lleno de monedas y joyas.'),

    -- Pistas para "faros"
    (10, 'Estructuras que guían a los barcos con luz.'),
    (10, 'Se encuentran en la costa o islas.'),
    (10, 'Emiten destellos para orientar a los navegantes.'),

    -- Pistas para "islas"
    (11, 'Terrenos rodeados completamente de agua.'),
    (11, 'Habitadas o deshabitadas, grandes o pequeñas.'),
    (11, 'Destinos turísticos y sitios de naturaleza aislada.'),

    -- Pistas para "remos"
    (12, 'Palos alargados para impulsar botes.'),
    (12, 'Se usan en botes pequeños.'),
    (12, 'Movidos por fuerza humana para avanzar.'),

    -- Pistas para "bogar"
    (13, 'Acción de remar para mover un bote.'),
    (13, 'Se practica en deportes acuáticos.'),
    (13, 'Implica coordinación y fuerza en el agua.'),

    -- Pistas para "carga"
    (14, 'Mercancía transportada por barco.'),
    (14, 'Puede ser de diversos tipos y tamaños.'),
    (14, 'Incluye alimentos, productos, y materiales.'),

    -- Pistas para "sedal"
    (15, 'Hilo utilizado para pescar.'),
    (15, 'Es parte de la caña de pescar.'),
    (15, 'Suele ser resistente y delgado.'),

    -- Pistas para "pesca"
    (16, 'Actividad de capturar peces en el mar.'),
    (16, 'Se realiza con redes o cañas.'),
    (16, 'Puede ser recreativa o comercial.'),

    -- Pistas para "arpon"
    (17, 'Instrumento afilado usado para cazar peces grandes.'),
    (17, 'Es lanzado o disparado bajo el agua.'),
    (17, 'Utilizado por buzos y pescadores.'),

    -- Pistas para "peñon"
    (18, 'Gran roca que sobresale del agua.'),
    (18, 'Se encuentra cerca de la costa o en el mar.'),
    (18, 'Puede ser un punto de referencia para barcos.'),

    -- Pistas para "pareo"
    (19, 'Prenda ligera que se usa en la playa.'),
    (19, 'Se usa sobre el traje de baño.'),
    (19, 'Popular en zonas de playa y climas cálidos.'),

    -- Pistas para "oeste"
    (20, 'Uno de los puntos cardinales.'),
    (20, 'Dirección opuesta al este.'),
    (20, 'Es hacia donde se pone el sol.'),

    -- Pistas para "algas"
    (21, 'Plantas marinas que flotan en el agua.'),
    (21, 'Son alimento para muchos peces.'),
    (21, 'Se encuentran en el fondo o superficie del mar.'),

    -- Pistas para "presa"
    (22, 'Animal que es cazado por otros.'),
    (22, 'Es el objetivo en la pesca o caza.'),
    (22, 'Suele ser alimento para otros animales.'),

    -- Pistas para "ancla"
    (23, 'Objeto que mantiene el barco en su lugar.'),
    (23, 'Se lanza al agua para detener una embarcación.'),
    (23, 'Pesado y de metal, con forma de gancho.'),

    -- Pistas para "canal"
    (24, 'Paso estrecho de agua entre tierras.'),
    (24, 'Utilizado para la navegación de barcos.'),
    (24, 'Conecta dos cuerpos de agua mayores.'),

    -- Pistas para "coral"
    (25, 'Estructura marina formada por pólipos.'),
    (25, 'Base de ecosistemas llamados arrecifes.'),
    (25, 'Hogar para numerosos animales marinos.'),

    -- Pistas para "cañon"
    (26, 'Arma antigua que dispara balas o proyectiles.'),
    (26, 'Utilizado para la defensa de barcos y puertos.'),
    (26, 'Se dispara con pólvora desde barcos o fortalezas.'),

    -- Pistas para "bahía"
    (27, 'Entrada de mar en la costa, de forma curva.'),
    (27, 'Zona de protección natural para barcos.'),
    (27, 'Lugar donde se pueden anclar embarcaciones.'),

    -- Pistas para "playa"
    (28, 'Zona de arena junto al mar.'),
    (28, 'Frecuentada por turistas y bañistas.'),
    (28, 'Lugar para relajarse y disfrutar del mar.'),

    -- Pistas para "balsa"
    (29, 'Embarcación pequeña y ligera.'),
    (29, 'Puede estar hecha de madera o materiales flotantes.'),
    (29, 'Se usa en rescates o como medio de emergencia.'),

    -- Pistas para "krill"
    (30, 'Pequeño crustáceo marino.'),
    (30, 'Principal alimento de algunas ballenas.'),
    (30, 'Es esencial en la cadena alimentaria del océano.'),

    -- Pistas para "norte"
    (31, 'Punto cardinal que indica la dirección hacia arriba.'),
    (31, 'Usado para orientarse en el mapa.'),
    (31, 'Contrario al sur.'),

    -- Pistas para "golfo"
    (32, 'Extensión del mar rodeada por tierra.'),
    (32, 'Más grande que una bahía.'),
    (32, 'Famoso en lugares como el Golfo de México.');

INSERT INTO `pista` (`palabraId`, `pista`) VALUES
    -- Pistas para "pirata"
    (33, 'Navegante que suele buscar tesoros en alta mar.'),
    (33, 'A menudo lleva un parche en el ojo.'),
    (33, 'Conocido por sus saqueos y aventuras marinas.'),

    -- Pistas para "viento"
    (34, 'Impulsa las velas de un barco y facilita su movimiento.'),
    (34, 'Puede ser suave o fuerte, según el clima.'),
    (34, 'Es fundamental para la navegación a vela.'),

    -- Pistas para "galeon"
    (35, 'Embarcación grande y antigua de madera.'),
    (35, 'Solía llevar cañones y tesoros.'),
    (35, 'Usado en exploraciones y comercio en siglos pasados.'),

    -- Pistas para "tesoro"
    (36, 'Objeto de gran valor escondido o enterrado.'),
    (36, 'Buscado por piratas y aventureros.'),
    (36, 'Puede estar guardado en un cofre bajo tierra o en el mar.'),

    -- Pistas para "sirena"
    (37, 'Mitad mujer, mitad pez, según la mitología.'),
    (37, 'Se dice que canta para atraer a los marineros.'),
    (37, 'Habita en las profundidades del océano.'),

    -- Pistas para "oceano"
    (38, 'Inmensa masa de agua salada que cubre la Tierra.'),
    (38, 'Hogar de especies marinas y zonas abisales.'),
    (38, 'Lugar de grandes exploraciones marítimas.'),

    -- Pistas para "puerto"
    (39, 'Lugar donde los barcos cargan y descargan mercancías.'),
    (39, 'Conecta las rutas marítimas con las ciudades.'),
    (39, 'Punto de anclaje y descanso para los barcos.'),

    -- Pistas para "triton"
    (40, 'Mitad hombre, mitad pez, figura mitológica.'),
    (40, 'Representa la fuerza y el misterio del mar.'),
    (40, 'Suele portar un tridente en su representación.'),

    -- Pistas para "rancho"
    (41, 'Refugio para descansar en largos viajes marítimos.'),
    (41, 'Lugar para comer y reponer fuerzas en alta mar.'),
    (41, 'Sitio de descanso en condiciones sencillas.'),

    -- Pistas para "averia"
    (42, 'Falla técnica en una embarcación.'),
    (42, 'Puede ser causada por tormentas o falta de mantenimiento.'),
    (42, 'Requiere reparaciones para continuar el viaje.'),

    -- Pistas para "deriva"
    (43, 'Cuando un barco se desplaza sin rumbo fijo.'),
    (43, 'Situación peligrosa si no se tiene control.'),
    (43, 'Se mueve por la corriente sin dirección.'),

    -- Pistas para "espuma"
    (44, 'Aparece en la superficie del mar cuando el agua se agita.'),
    (44, 'Común en olas rompientes y mar movido.'),
    (44, 'Se ve como pequeñas burbujas en el agua.'),

    -- Pistas para "aletas"
    (45, 'Extremidades de peces y animales marinos.'),
    (45, 'Permiten moverse y estabilizarse en el agua.'),
    (45, 'Fundamentales para nadar y cambiar de dirección.'),

    -- Pistas para "estela"
    (46, 'Rastro de agua que deja un barco al pasar.'),
    (46, 'Marca el recorrido de una embarcación.'),
    (46, 'Es visible en el agua detrás del barco.'),

    -- Pistas para "laguna"
    (47, 'Pequeño cuerpo de agua salada o dulce cerca del mar.'),
    (47, 'Suele estar rodeado de vegetación.'),
    (47, 'Un ecosistema rico en flora y fauna acuática.'),

    -- Pistas para "islote"
    (48, 'Isla pequeña y rocosa sin habitantes.'),
    (48, 'Lugar de descanso para aves y fauna marina.'),
    (48, 'Emergencia de tierra en medio del mar.'),

    -- Pistas para "concha"
    (49, 'Cubierta dura que protege ciertos animales marinos.'),
    (49, 'Se encuentra en la playa tras el oleaje.'),
    (49, 'Es la casa de moluscos como los caracoles.'),

    -- Pistas para "medusa"
    (50, 'Animal marino transparente con tentáculos.'),
    (50, 'Puede picar si se toca.'),
    (50, 'Flota en el agua y tiene forma de campana.'),

    -- Pistas para "abisal"
    (51, 'Zona oscura y profunda del océano.'),
    (51, 'Allí habitan criaturas extrañas y adaptadas.'),
    (51, 'Áreas de gran presión y sin luz.'),

    -- Pistas para "calado"
    (52, 'Profundidad de inmersión de un barco en el agua.'),
    (52, 'Indica cuánto del barco está bajo el agua.'),
    (52, 'Importante para evitar encallamientos.'),

    -- Pistas para "goleta"
    (53, 'Barco pequeño con varias velas y casco estrecho.'),
    (53, 'Usado en comercio y exploración costera.'),
    (53, 'Embarcación ligera y rápida en el mar.'),

    -- Pistas para "orilla"
    (54, 'Límite donde el mar se encuentra con la tierra.'),
    (54, 'Lugar donde las olas rompen.'),
    (54, 'Zona de paseo y esparcimiento costero.'),

    -- Pistas para "muelle"
    (55, 'Estructura donde atracan los barcos.'),
    (55, 'Punto de embarque y desembarque en el puerto.'),
    (55, 'Permite acceso fácil a embarcaciones.'),

    -- Pistas para "resaca"
    (56, 'Corriente que regresa al mar después de que la ola rompe.'),
    (56, 'Puede ser peligrosa para nadadores.'),
    (56, 'Se siente como una succión hacia el océano.'),

    -- Pistas para "marina"
    (57, 'Relativo al mar o a la navegación.'),
    (57, 'También puede referirse a una fuerza naval.'),
    (57, 'Conjunto de embarcaciones y estructura portuaria.'),

    -- Pistas para "ostras"
    (58, 'Moluscos que viven en conchas y producen perlas.'),
    (58, 'Se cultivan en el mar para consumo.'),
    (58, 'Suelen encontrarse en aguas saladas poco profundas.');

INSERT INTO `pista` (`palabraId`, `pista`) VALUES
    -- Pistas para "olas"
    (59, 'Formaciones de agua que se desplazan hacia la costa.'),
    (59, 'Se generan por el viento y afectan a la navegación.'),
    (59, 'Rompen en la orilla y generan espuma.'),

    -- Pistas para "vela"
    (60, 'Elemento que impulsa al barco con la fuerza del viento.'),
    (60, 'Hecha de tela y situada en el mástil.'),
    (60, 'Fundamental para la navegación sin motor.'),

    -- Pistas para "isla"
    (61, 'Tierra rodeada de agua por todos sus lados.'),
    (61, 'Puede ser pequeña o grande y habitada o desierta.'),
    (61, 'Lugar de refugio para marineros en naufragio.'),

    -- Pistas para "faro"
    (62, 'Torre que guía a los barcos en la noche.'),
    (62, 'Emite luz para evitar que encallen en la costa.'),
    (62, 'Símbolo de seguridad en la navegación.'),

    -- Pistas para "proa"
    (63, 'Parte delantera de una embarcación.'),
    (63, 'Es la parte que enfrenta las olas en la navegación.'),
    (63, 'El frente del barco, opuesta a la popa.'),

    -- Pistas para "popa"
    (64, 'Parte trasera de una embarcación.'),
    (64, 'Donde se suelen colocar los motores.'),
    (64, 'Opuesta a la proa en el barco.'),

    -- Pistas para "mapa"
    (65, 'Guía visual utilizada para la navegación.'),
    (65, 'Representa la geografía de tierras y mares.'),
    (65, 'Herramienta esencial para marineros y exploradores.'),

    -- Pistas para "nudo"
    (66, 'Unidad de velocidad en la navegación.'),
    (66, 'También se refiere a la forma de atar cuerdas.'),
    (66, 'Fundamental para maniobras de amarre y anclaje.'),

    -- Pistas para "lino"
    (67, 'Material utilizado para hacer velas y cuerdas.'),
    (67, 'Fibra resistente y ligera.'),
    (67, 'Usado en la industria marítima desde tiempos antiguos.'),

    -- Pistas para "azul"
    (68, 'Color asociado con el mar y el cielo.'),
    (68, 'Evoca tranquilidad y profundidad.'),
    (68, 'El color de los océanos en días despejados.'),

    -- Pistas para "boya"
    (69, 'Flotador que marca zonas específicas en el agua.'),
    (69, 'Sirve como señal para los navegantes.'),
    (69, 'Se mantiene a flote con un anclaje en el fondo.'),

    -- Pistas para "cabo"
    (70, 'Accidente geográfico que se adentra en el mar.'),
    (70, 'También se refiere a una cuerda gruesa en náutica.'),
    (70, 'Es un punto de referencia importante para la navegación.'),

    -- Pistas para "lago"
    (71, 'Cuerpo de agua rodeado de tierra, generalmente de agua dulce.'),
    (71, 'Suele estar más tranquilo que el mar.'),
    (71, 'Es un lugar de recreo y pesca.'),

    -- Pistas para "fosa"
    (72, 'Gran depresión en el fondo marino.'),
    (72, 'Puede alcanzar profundidades extremas.'),
    (72, 'Hogar de especies adaptadas a alta presión y oscuridad.'),

    -- Pistas para "este"
    (73, 'Punto cardinal opuesto al oeste.'),
    (73, 'Dirección en la que sale el sol.'),
    (73, 'Usado como referencia en la navegación y mapas.'),

    -- Pistas para "yate"
    (74, 'Embarcación de lujo utilizada para recreación.'),
    (74, 'Suele tener cabinas y comodidades para los pasajeros.'),
    (74, 'Generalmente es impulsado por motores.'),

    -- Pistas para "remo"
    (75, 'Pieza larga usada para propulsar botes a mano.'),
    (75, 'Fundamental en pequeñas embarcaciones.'),
    (75, 'Se mueve en el agua para avanzar en la dirección deseada.'),

    -- Pistas para "lodo"
    (76, 'Mezcla de tierra y agua, encontrada en zonas pantanosas.'),
    (76, 'Puede dificultar el movimiento en la costa o ríos.'),
    (76, 'Es común en zonas de baja marea y costas.') ,

    -- Pistas para "pico"
    (77, 'Parte puntiaguda de una montaña o formación rocosa.'),
    (77, 'Lugar de avistamiento para barcos en el horizonte.'),
    (77, 'Puede estar rodeado de acantilados y mar.'),

    -- Pistas para "roca"
    (78, 'Formación sólida en el mar o en la costa.'),
    (78, 'Puede ser un peligro para la navegación.'),
    (78, 'A menudo, las olas rompen contra ella.'),

    -- Pistas para "agua"
    (79, 'Elemento vital que cubre la mayoría de la Tierra.'),
    (79, 'Fundamental para la vida marina y la navegación.'),
    (79, 'Puede ser dulce o salada según su origen.'),

    -- Pistas para "bojo"
    (80, 'Parte inferior de una embarcación, el casco.'),
    (80, 'Es la zona que está en contacto con el agua.'),
    (80, 'Debe ser resistente para soportar el peso y el movimiento.');

INSERT INTO `imagen` (`nombre`,`url`) VALUES
    ('arrecife','arrecife.jpg'),
    ('ballena','ballena.jpg'),
    ('barco','barco.jpg'),
    ('barcoDestruido','barcoDestruido.jpg'),
    ('buseo','buseo.jpg'),
    ('cangre','cangre.jpg'),
    ('loro','loro.jpg'),
    ('orca','orca.jpg'),
    ('playa','playa.jpg'),
    ('arrecife Nocturno','arrecifeNoche.jpg'), 
    ('palmeras','palmeras.jpg'),
    ('olas','olas.jpg'),
    ('sirena','sirena.jpg'),
    ('tornado','tornado.jpg'),
    ('nube Bajo Agua','nubeBajoAgua.jpg'),
    ('concha','concha.jpg'),
    ('moustro','moustro.jpg'),
    ('castillo','castillo.jpg'),
    ('buso Profesional','busoProfesional.jpg'),
    ('barco Pirata','barcoPirata.jpg'),
    ('ballena Cosmica','ballenaCosmica.jpg'),
    ('arrecifeNoche','arrecifeNoche.jpg'); 

-- Nivel 1 (Área 3, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(1, 1, 3, 15),
(2, 1, 3, 15),
(3, 1, 3, 15),
(4, 1, 3, 15),
(5, 1, 3, 15),
(6, 1, 3, 15);

-- Nivel 2 (Área 4, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(7, 2, 4, 18),
(8, 2, 4, 18),
(9, 2, 4, 18),
(10, 2, 4, 18),
(11, 2, 4, 18),
(12, 2, 4, 18);

-- Nivel 3 (Área 4, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(13, 3, 4, 20),
(14, 3, 4, 20),
(15, 3, 4, 20),
(16, 3, 4, 20),
(17, 3, 4, 20),
(18, 3, 4, 20);

-- Nivel 4 (Área 5, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(19, 4, 5, 22),
(20, 4, 5, 22),
(21, 4, 5, 22),
(1, 4, 5, 22),
(2, 4, 5, 22),
(3, 4, 5, 22);

-- Nivel 5 (Área 5, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(4, 5, 5, 25),
(5, 5, 5, 25),
(6, 5, 5, 25),
(7, 5, 5, 25),
(8, 5, 5, 25),
(9, 5, 5, 25);

-- Nivel 6 (Área 6, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(10, 6, 6, 28),
(11, 6, 6, 28),
(12, 6, 6, 28),
(13, 6, 6, 28),
(14, 6, 6, 28),
(15, 6, 6, 28);

-- Nivel 7 (Área 6, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(16, 7, 6, 30),
(17, 7, 6, 30),
(18, 7, 6, 30),
(19, 7, 6, 30),
(20, 7, 6, 30),
(21, 7, 6, 30);

-- Nivel 8 (Área 7, 6 imágenes)
INSERT INTO `imagenNivel` (`imagenId`, `nivelId`, `area`, `movimientosMin`)
VALUES 
(1, 8, 7, 32),
(2, 8, 7, 32),
(3, 8, 7, 32),
(4, 8, 7, 32),
(5, 8, 7, 32),
(6, 8, 7, 32);

/*alter usuarios*/
ALTER TABLE usuarios
ADD COLUMN reset_token VARCHAR(255),
ADD COLUMN token_expiration DATETIME;