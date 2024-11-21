<?php

include('../conexion/conexion.php');
session_start();

$usuarioId= $_SESSION['id'];

$response = [];
$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
    SELECT 
        n.id, 
        n.nombre, 
        n.numero 
    FROM niveles n
    LEFT JOIN historialniveles h 
        ON n.id = h.nivelId AND h.usuarioId = ?
    WHERE 
        -- Mostrar el nivel 1 siempre que no esté completado o no exista en el historial
        (n.numero = 1 AND (h.estadoNivel IS NULL OR h.estadoNivel = 0))
        OR 
        -- Mostrar los niveles donde el jugador ha alcanzado el estado de completado
        (h.estadoNivel = TRUE)
        OR
        -- Mostrar el siguiente nivel disponible para jugar
        (h.estadoNivel IS NULL AND EXISTS (
            SELECT 1 
            FROM historialniveles h_prev 
            WHERE h_prev.usuarioId = ?
              AND h_prev.estadoNivel = TRUE 
              AND h_prev.nivelId = n.id - 1
        ))
    ORDER BY n.numero ASC;    
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $usuarioId,$usuarioId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'numero' => $row['numero']
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
