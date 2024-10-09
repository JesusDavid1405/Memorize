<?php

$palabras = [
    [
        "palabra" => "arena",
        "pistas" => [
            "Material fino y granulado que se encuentra en las playas.",
            "Es suave y normalmente de color beige o dorado.",
            "Se utiliza para hacer castillos en la orilla del mar."
        ]
    ],
    [
        "palabra" => "coral",
        "pistas" => [
            "Estructura formada por organismos marinos que forman arrecifes.",
            "Se encuentra en aguas cálidas y es hogar de muchos peces.",
            "Es muy apreciado en la joyería por su belleza."
        ]
    ],
    [
        "palabra" => "naveg",
        "pistas" => [
            "Acción de viajar por el mar en un barco o embarcación.",
            "Requiere habilidades para manejar el timón y las velas.",
            "Se hace utilizando cartas de navegación o sistemas modernos."
        ]
    ],
    [
        "palabra" => "algas",
        "pistas" => [
            "Plantas marinas que crecen en el océano y son verdes, pardas o rojas.",
            "Forman parte de la base de la cadena alimentaria en el mar.",
            "Algunas de ellas se utilizan en la cocina, como el sushi."
        ]
    ],
    [
        "palabra" => "olaje",
        "pistas" => [
            "Movimiento de las olas en el mar.",
            "A veces puede ser violento durante tormentas.",
            "Es algo que los surfistas buscan para montar las olas."
        ]
    ],
    [
        "palabra" => "buque",
        "pistas" => [
            "Barco grande destinado al transporte marítimo.",
            "Se usa para llevar mercancías o pasajeros a través del océano.",
            "Suele tener varias cubiertas y grandes motores."
        ]
    ],
    [
        "palabra" => "playa",
        "pistas" => [
            "Orilla del mar, generalmente cubierta de arena.",
            "Es un lugar popular para vacaciones y descanso.",
            "En este lugar se puede nadar, tomar el sol o jugar."
        ]
    ],
    [
        "palabra" => "brisa",
        "pistas" => [
            "Viento suave y refrescante que sopla en las costas.",
            "Es más común en las tardes, especialmente cerca del agua.",
            "Ayuda a mantener frescas las zonas costeras en días cálidos."
        ]
    ],
    [
        "palabra" => "peces",
        "pistas" => [
            "Animales vertebrados que viven en el agua y respiran por branquias.",
            "Tienen aletas en lugar de extremidades.",
            "Son una fuente importante de alimento para los humanos y otros animales."
        ]
    ],
    [
        "palabra" => "faros",
        "pistas" => [
            "Construcciones altas en la costa que emiten luz para guiar a los barcos.",
            "Su luz parpadea para ayudar a los navegantes en la oscuridad.",
            "Suelen estar situados en acantilados o islas peligrosas."
        ]
    ],
    [
        "palabra" => "golfo",
        "pistas" => [
            "Gran extensión de mar que se adentra en la costa.",
            "Es una zona más cerrada que un océano.",
            "Algunos tienen importantes puertos debido a su protección natural."
        ]
    ],
    [
        "palabra" => "delta",
        "pistas" => [
            "Zona donde un río se encuentra con el mar, formando varias ramificaciones.",
            "Suele ser una región fértil donde el río deposita sedimentos.",
            "Famoso ejemplo es el Delta del Nilo."
        ]
    ],
    [
        "palabra" => "marea",
        "pistas" => [
            "Subida y bajada periódica del nivel del mar, causada por la luna.",
            "Puede variar de forma considerable en diferentes regiones.",
            "Los pescadores y navegantes suelen consultar las mareas antes de salir."
        ]
    ],
    [
        "palabra" => "bahia",
        "pistas" => [
            "Entrada de mar rodeada de tierra, pero con una apertura amplia al océano.",
            "Suelen ser lugares tranquilos y protegidos para anclar barcos.",
            "Famosas bahías incluyen la Bahía de San Francisco."
        ]
    ],
    [
        "palabra" => "pleco",
        "pistas" => [
            "Es un conocido pez de acuario del orden Siluriformes, originario de Sudamérica.",
            "Se usa mucho en la gastronomía, enlatado o fresco.",
            "Es un nadador rápido y tiene un cuerpo robusto y aerodinámico."
        ]
    ],
    [
        "palabra" => "remos",
        "pistas" => [
            "Instrumento utilizado para impulsar una embarcación pequeña.",
            "Se usa principalmente en botes sin motor.",
            "Consiste en un mango largo con una pala al final."
        ]
    ],
    [
        "palabra" => "cebra",
        "pistas" => [
            "Señal visual utilizada en la navegación marítima.",
            "Tiene un patrón rayado alterno de blanco y negro.",
            "Es un diseño que se emplea para alertar o guiar a los barcos."
        ]
    ],
    [
        "palabra" => "ancla",
        "pistas" => [
            "Objeto pesado utilizado para mantener un barco en su lugar en el mar.",
            "Se arroja al agua y se clava en el fondo marino.",
            "Tiene una forma característica con ganchos para mayor agarre."
        ]
    ],
    [
        "palabra" => "velas",
        "pistas" => [
            "Se utilizan para propulsar un barco usando el viento.",
            "Son piezas de tela grandes que se despliegan en los mástiles.",
            "Han sido fundamentales en la navegación antes del uso de motores."
        ]
    ]
];

header('Content-Type: application/json'); // Asegúrate de que 'Content-Type' esté en mayúsculas

echo json_encode($palabras);

?>
