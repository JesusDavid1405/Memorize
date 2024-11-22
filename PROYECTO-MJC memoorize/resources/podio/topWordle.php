<?php

    include('../conexion/conexion.php');

    session_start();

    $response = [];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);


    if ($data && isset($data['id'])) {
        $juego=$data['id'];

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
            n.numero AS nivel,
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
        JOIN
            niveles n ON hn.nivelId= n.id
        WHERE 
            hn.estadoNivel = 1 
            AND j.id = IFNULL(?, 2) -- Si no se proporciona un ID de juego, usa el juego con ID = 1
        ORDER BY 
            hn.puntos DESC
        LIMIT 10;
        ";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $juego);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {

            while ($row = $result->fetch_assoc()) {
                $response[]=[
                    'avatar' => $row['avatarImagen'],
                    'nickName' => $row['usuario'],
                    'puntos'=> $row['puntos'],
                    'tiempo'=>$row['tiempo'],
                    'nivel' => $row['nivel']
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

    }

    header('Content-Type: application/json');
    echo json_encode($response);


?>