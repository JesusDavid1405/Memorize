<?php

include('../conexion/conexion.php');

session_start();

$response = [];

$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
    SELECT 
        hn.id AS historialId,
        u.nickName AS usuario,
        a.nombre AS avatarNombre,
        a.imagen AS avatarImagen,
        j.nombre AS juego,
        hn.nivelId AS nivel,
        hn.puntos,
        hn.tiempo,
        hn.monedas,
        hn.estadoNivel
    FROM 
        historialNiveles hn
    JOIN 
        usuarios u ON hn.usuarioId = u.id
    JOIN 
        juegos j ON hn.juegoId = j.id
    JOIN 
        avatares a ON u.avatarId = a.id
    WHERE 
        hn.estadoNivel = 1 AND j.id = ?
    ORDER BY 
        hn.puntos DESC
    LIMIT 10;

    ";

    $stmt = $conn->prepare($query);
    // $stmt->bind_param("i", $);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {

        while ($row = $result->fetch_assoc()) {
            $response[]=[
                'avatar' => $row['avatarImagen'],
                'nickName' => $row['usuario'],
                'puntos'=> $row['puntos'],
                'tiempo'=>$row['tiempo']
            ];
        }
    } else {

        $response = [
            'status' => 'FALSE',
            'mensaje' => 'No hay avatares disponibles para mostrar.'
        ];

    }

    $database->disconnect();
}


header('Content-Type: application/json');
echo json_encode($response);


?>